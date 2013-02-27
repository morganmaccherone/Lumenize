{functions} = require('../')

exports.functionsTest =

  testExpandMetrics: (test) ->

#    console.log('***')
#    console.log(functions.expandMetrics.toString())
#    functions.junk = 'junk'
#    console.log('***')

    metrics = [
      {f: 'average', field: 'a'},
      {f: 'variance', field: 'b'}
      {f: 'standardDeviation', field: 'c'}
    ]

    functions.expandMetrics(metrics)

    expected = [
      {
        "metric": "sumSquares",
        "field": "c",
        "as": "c_sumSquares",
        f: functions.sumSquares
      },
      {
        "metric": "sum",
        "field": "c",
        "as": "c_sum",
        f: functions.sum
      },
      {
        "metric": "sumSquares",
        "field": "b",
        "as": "b_sumSquares",
        f: functions.sumSquares
      },
      {
        "metric": "sum",
        "field": "b",
        "as": "b_sum",
        f: functions.sum
      },
      {
        "metric": "sum",
        "field": "a",
        "as": "a_sum",
        f: functions.sum
      },
      {
        "metric": "count",
        "field": "",
        "as": "_count",
        f: functions.count
      },
      {
        "metric": "average",
        "field": "a",
        "as": "a_average",
        f: functions.average
      },
      {
        "metric": "variance",
        "field": "b",
        "as": "b_variance",
        f: functions.variance
      },
      {
        "metric": "standardDeviation",
        "field": "c",
        "as": "c_standardDeviation",
        f: functions.standardDeviation
      }
    ]
    test.deepEqual(expected, metrics)

    test.done()

  testExpandMetricsWithSomeExisting: (test) ->
    metrics = [
      {f: 'values', field: 'a'}
      {f: 'p50', field: 'a'}
    ]

    functions.expandMetrics(metrics)

    test.equal(2, metrics.length)

    test.done()

  testExpandMetricsWithBadOrder: (test) ->
    metrics = [
      {f: 'average', field: 'a'}
      {f: 'sum', field: 'a'}
    ]

    f = () ->
      functions.expandMetrics(metrics)

    test.throws(f, Error)

    test.done()

  testMissingCount: (test) ->
    metrics = functions.expandMetrics(undefined, true)

    test.deepEqual(metrics, [{metric: 'count', field: '', f: functions.count, as: '_count', metric: 'count'}])

    test.done()

  testAsProvided: (test) ->
    metrics = [
      {as: 'scope', field: 'a', f: 'sum'}
    ]

    functions.expandMetrics(metrics)

    test.equal('scope', metrics[0].as)

    test.done()

  testFunction: (test) ->
    myFunc = () ->
      return 'hello'

    metrics = [
      {f: myFunc, field: 'hello'}
    ]

    f = () ->
      functions.expandMetrics(metrics)

    test.throws(f)

    metrics = [
      {f: myFunc, as: 'hello', field: 'hello'}
    ]

    functions.expandMetrics(metrics, undefined, true)

    test.deepEqual(metrics[1].f.dependencies, ['values'])

    test.equal(metrics.length, 2)

    test.done()


  testSum: (test) ->

    test.equal(functions.sum([0]),0) #array of 0
    test.equal(functions.sum([-1, 0, 1, -2]), -2) #array with negative sum
    test.equal(functions.sum([]), 0) #empty array

    test.done()

  testSumSquares: (test) ->

    test.equal(functions.sumSquares([0]), 0) #array containing only 0
    test.equal(functions.sumSquares([0, 1, 2]),5)
    test.equal(functions.sumSquares([-2, -1, 0, 1, 2]),10) #array with negative numbers
    test.equal(functions.sumSquares([]), 0) #empty array

    test.done()

   testLastValue: (test) ->

     test.equal(functions.lastValue([0]), 0)
     test.equal(functions.lastValue([]), null) #last value of an empty array is null
     test.equal(functions.lastValue([-2, 0, 2]), 2)
     test.done()

  testPercentileCreator: (test) ->
    values =  [-2, -1, 0, 1, 2]

    test.equal(functions.percentileCreator(50)(values), 0)
   # test.equal(functions.percentileCreator('median')(values),0) #expected: 0, but 1 passes as well
    test.done()

  testPercentileCreatorEven: (test) ->
    values = [-2, -1, 1, 2]
    test.equal(functions.percentileCreator(50)(values), 0)
   # test.equal(functions.percentileCreator('median')values, 0) #unexpected identifier
    test.done()

  testPercentileCreator: (test) ->
    values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    test.equal(functions.percentileCreator(99.9)(values), 9.991)
    test.equal(functions.percentileCreator(50)(values), 5.5)
   # test.equal(functions.percentileCreator('median')(values), 5.5) #expected: 5.5, actual:null
    test.done()