lumenize = require('../')
{TimeSeriesCalculator, Time, utils} = lumenize

snapshotsCSV = [
  ["ObjectID", "_ValidFrom",               "_ValidTo",                 "ScheduleState", "PlanEstimate", "TaskRemainingTotal", "TaskEstimateTotal"],

  [1,          "2010-10-10T15:00:00.001Z", "2011-01-02T13:00:00.001Z", "Ready to pull", 5             , 15                  , 15],  # Shouldn't show up, 2010 before start

  [1,          "2011-01-02T13:00:00.001Z", "2011-01-02T15:10:00.001Z", "Ready to pull", 5             , 15                  , 15],  # !TODO: Should get the same results even without this line
  [1,          "2011-01-02T15:10:00.001Z", "2011-01-03T15:00:00.001Z", "In progress"  , 5             , 20                  , 15],  # Testing it starting at one state and switching later to another
  [2,          "2011-01-02T15:00:00.002Z", "2011-01-03T15:00:00.002Z", "Ready to pull", 3             , 5                   , 5],
  [3,          "2011-01-02T15:00:00.003Z", "2011-01-03T15:00:00.003Z", "Ready to pull", 5             , 12                  , 12],

  [2,          "2011-01-03T15:00:00.002Z", "2011-01-04T15:00:00.002Z", "In progress"  , 3             , 5                   , 5],
  [3,          "2011-01-03T15:00:00.003Z", "2011-01-04T15:00:00.003Z", "Ready to pull", 5             , 12                  , 12],
  [4,          "2011-01-03T15:00:00.004Z", "2011-01-04T15:00:00.004Z", "Ready to pull", 5             , 15                  , 15],
  [1,          "2011-01-03T15:10:00.001Z", "2011-01-04T15:00:00.001Z", "In progress"  , 5             , 12                  , 15],  # Testing later change

  [1,          "2011-01-04T15:00:00.001Z", "2011-01-06T15:00:00.001Z", "Accepted"     , 5             , 0                   , 15],
  [2,          "2011-01-04T15:00:00.002Z", "2011-01-06T15:00:00.002Z", "In test"      , 3             , 1                   , 5],
  [3,          "2011-01-04T15:00:00.003Z", "2011-01-05T15:00:00.003Z", "In progress"  , 5             , 10                  , 12],
  [4,          "2011-01-04T15:00:00.004Z", "2011-01-06T15:00:00.004Z", "Ready to pull", 5             , 15                  , 15],
  [5,          "2011-01-04T15:00:00.005Z", "2011-01-06T15:00:00.005Z", "Ready to pull", 2             , 4                   , 4],

  [3,          "2011-01-05T15:00:00.003Z", "2011-01-07T15:00:00.003Z", "In test"      , 5             , 5                   , 12],

  [1,          "2011-01-06T15:00:00.001Z", "2011-01-07T15:00:00.001Z", "Released"     , 5             , 0                   , 15],
  [2,          "2011-01-06T15:00:00.002Z", "2011-01-07T15:00:00.002Z", "Accepted"     , 3             , 0                   , 5],
  [4,          "2011-01-06T15:00:00.004Z", "2011-01-07T15:00:00.004Z", "In progress"  , 5             , 7                   , 15],
  [5,          "2011-01-06T15:00:00.005Z", "2011-01-07T15:00:00.005Z", "Ready to pull", 2             , 4                   , 4],

  [1,          "2011-01-07T15:00:00.001Z", "9999-01-01T00:00:00.001Z", "Released"     , 5            , 0                    , 15],
  [2,          "2011-01-07T15:00:00.002Z", "9999-01-01T00:00:00.002Z", "Released"     , 3            , 0                    , 5],
  [3,          "2011-01-07T15:00:00.003Z", "9999-01-01T00:00:00.003Z", "Accepted"     , 5            , 0                    , 12],
  [4,          "2011-01-07T15:00:00.004Z", "9999-01-01T00:00:00.004Z", "In test"      , 5            , 3                    , 15]
  # Note: ObjectID 5 deleted
]

snapshots = lumenize.csvStyleArray_To_ArrayOfMaps(snapshotsCSV)

exports.TimeSeriesCalculator =

  testBasic: (test) ->

    granularity = lumenize.Time.DAY
    tz = 'America/Chicago'
    holidays = [
      {year: 2011, month: 1, day: 5}  # Made up holiday to test knockout
    ]

    deriveFieldsOnInput = [
      {field: 'AcceptedStoryCount', f: (row) ->
        if row.ScheduleState in ['Accepted', 'Released']
          return 1
        else
          return 0
      },
      {field: 'AcceptedStoryPoints', f: (row) ->
        if row.ScheduleState in ['Accepted', 'Released']
          return row.PlanEstimate
        else
          return 0
      }
    ]

    metrics = [
      {as: 'StoryUnitScope', field: 'PlanEstimate', f: 'sum'},
      {as: 'StoryCountScope', f: 'count'},
      {as: 'StoryCountBurnUp', field: 'AcceptedStoryCount', f: 'sum'},
      {as: 'StoryUnitBurnUp', field: 'AcceptedStoryPoints', f: 'sum'},
      {as: 'TaskUnitBurnDown', field: 'TaskRemainingTotal', f: 'sum'},
      {as: 'TaskUnitScope', field: 'TaskEstimateTotal', f: 'sum'}  # Note, we don't have the task count denormalized in stories so we can't have TaskCountScope nor TaskUnitBurnDown
    ]

    summaryMetricsConfig = [
      {field: 'TaskUnitScope', f: 'max'},
      {field: 'TaskUnitBurnDown', f: 'max'},
      {as: 'TaskUnitBurnDown_max_index', f: (seriesData, summaryMetrics) ->
        for row, index in seriesData
          if row.TaskUnitBurnDown is summaryMetrics.TaskUnitBurnDown_max
            return index
      }
    ]

    deriveFieldsAfterSummary = [
      {as: 'Ideal', f: (row, index, summaryMetrics, seriesData) ->
        max = summaryMetrics.TaskUnitScope_max
        increments = seriesData.length - 1
        incrementAmount = max / increments
        return Math.floor(100 * (max - index * incrementAmount)) / 100
      },
      {as: 'Ideal2', f: (row, index, summaryMetrics, seriesData) ->
        if index < summaryMetrics.TaskUnitBurnDown_max_index
          return null
        else
          max = summaryMetrics.TaskUnitBurnDown_max
          increments = seriesData.length - 1 - summaryMetrics.TaskUnitBurnDown_max_index
          incrementAmount = max / increments
          return Math.floor(100 * (max - (index - summaryMetrics.TaskUnitBurnDown_max_index) * incrementAmount)) / 100
      }
    ]

    config =  # default workDays
      deriveFieldsOnInput: deriveFieldsOnInput
      metrics: metrics
      summaryMetricsConfig: summaryMetricsConfig
      deriveFieldsAfterSummary: deriveFieldsAfterSummary
      granularity: granularity
      tz: tz
      holidays: holidays
      workDays: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday' # They work on Sundays

    calculator = new TimeSeriesCalculator(config)

    startOn = new Time('2011-01-01').getISOStringInTZ(tz)
    endBefore = new Time('2011-01-09').getISOStringInTZ(tz)

    calculator.addSnapshots(snapshots, startOn, endBefore)

    expected = {
      "seriesData": [
        {
          "tick": "2011-01-02T06:00:00.000Z",
          "StoryUnitScope": 5,
          "StoryCountScope": 1,
          "StoryCountBurnUp": 0,
          "StoryUnitBurnUp": 0,
          "TaskUnitBurnDown": 15,
          "TaskUnitScope": 15,
          "label": "2011-01-02",
          "Ideal": 51,
          "Ideal2": null
        },
        {
          "tick": "2011-01-03T06:00:00.000Z",
          "StoryUnitScope": 13,
          "StoryCountScope": 3,
          "StoryCountBurnUp": 0,
          "StoryUnitBurnUp": 0,
          "TaskUnitBurnDown": 37,
          "TaskUnitScope": 32,
          "label": "2011-01-03",
          "Ideal": 40.79,
          "Ideal2": null
        },
        {
          "tick": "2011-01-04T06:00:00.000Z",
          "StoryUnitScope": 18,
          "StoryCountScope": 4,
          "StoryCountBurnUp": 0,
          "StoryUnitBurnUp": 0,
          "TaskUnitBurnDown": 44,
          "TaskUnitScope": 47,
          "label": "2011-01-04",
          "Ideal": 30.6,
          "Ideal2": 44
        },
        {
          "tick": "2011-01-06T06:00:00.000Z",
          "StoryUnitScope": 20,
          "StoryCountScope": 5,
          "StoryCountBurnUp": 1,
          "StoryUnitBurnUp": 5,
          "TaskUnitBurnDown": 25,
          "TaskUnitScope": 51,
          "label": "2011-01-06",
          "Ideal": 20.4,
          "Ideal2": 29.33
        },
        {
          "tick": "2011-01-07T06:00:00.000Z",
          "StoryUnitScope": 20,
          "StoryCountScope": 5,
          "StoryCountBurnUp": 2,
          "StoryUnitBurnUp": 8,
          "TaskUnitBurnDown": 16,
          "TaskUnitScope": 51,
          "label": "2011-01-07",
          "Ideal": 10.2,
          "Ideal2": 14.66
        },
        {
          "tick": "2011-01-09T06:00:00.000Z",
          "StoryUnitScope": 18,
          "StoryCountScope": 4,
          "StoryCountBurnUp": 3,
          "StoryUnitBurnUp": 13,
          "TaskUnitBurnDown": 3,
          "TaskUnitScope": 47,
          "label": "2011-01-09",
          "Ideal": 0,
          "Ideal2": 0
        }
      ],
      "summaryMetrics": {
        "TaskUnitScope_max": 51,
        "TaskUnitBurnDown_max": 44,
        "TaskUnitBurnDown_max_index": 2
      }
    }

    test.deepEqual(calculator.getResults(), expected)

    test.done()

  testIncremental: (test) ->

    granularity = lumenize.Time.DAY
    tz = 'America/Chicago'
    holidays = [
      {year: 2011, month: 1, day: 5}  # Made up holiday to test knockout
    ]

    deriveFieldsOnInput = [
      {field: 'AcceptedStoryCount', f: (row) ->
        if row.ScheduleState in ['Accepted', 'Released']
          return 1
        else
          return 0
      },
      {field: 'AcceptedStoryPoints', f: (row) ->
        if row.ScheduleState in ['Accepted', 'Released']
          return row.PlanEstimate
        else
          return 0
      }
    ]

    metrics = [
      {as: 'StoryUnitScope', field: 'PlanEstimate', f: 'sum'},
      {as: 'StoryCountScope', f: 'count'},
      {as: 'StoryCountBurnUp', field: 'AcceptedStoryCount', f: 'sum'},
      {as: 'StoryUnitBurnUp', field: 'AcceptedStoryPoints', f: 'sum'},
      {as: 'TaskUnitBurnDown', field: 'TaskRemainingTotal', f: 'sum'},
      {as: 'TaskUnitScope', field: 'TaskEstimateTotal', f: 'sum'}  # Note, we don't have the task count denormalized in stories so we can't have TaskCountScope nor TaskUnitBurnDown
    ]

    config =  # default workDays
      deriveFieldsOnInput: deriveFieldsOnInput
      metrics: metrics
      granularity: granularity
      tz: tz
      holidays: holidays
      workDays: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday' # They work on Sundays

    config2 = utils.clone(config)

    calculator = new TimeSeriesCalculator(config)
    startOn = new Time('2011-01-03').getISOStringInTZ(tz)
    endBefore = new Time('2011-01-10').getISOStringInTZ(tz)
    calculator.addSnapshots(snapshots, startOn, endBefore)

    calculator2 = new TimeSeriesCalculator(config2)

    startOn = new Time('2011-01-03').getISOStringInTZ(tz)
    endBefore = new Time('2011-01-05').getISOStringInTZ(tz)
    calculator2.addSnapshots(snapshots.slice(0, 9), startOn, endBefore)
#    calculator2.addSnapshots(snapshots, startOn, endBefore)

    startOn = endBefore
    endBefore = new Time('2011-01-10').getISOStringInTZ(tz)
    calculator2.addSnapshots(snapshots.slice(5), startOn, endBefore)
#    calculator2.addSnapshots(snapshots, startOn, endBefore)

    test.deepEqual(calculator.getResults(), calculator2.getResults())

    test.done()