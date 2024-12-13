module.exports = {
  data: {
    name: "Better Multiple Comparisons"
  },
  info: {
  source: "https://github.com/slothyace/bmods-acedia/tree/main/QOLs",
  creator: "Acedia QOLs",
  donate: "https://ko-fi.com/slothyacedia",
  },
  category: "Conditions",
  modules: [],
  UI: [
    {
      element: "input",
      storeAs: "input",
      name: "Input",
    },
    {
      element: "menu",
      storeAs: "matchConditions",
      name: "Conditions",
      types: {
        conditions: "conditions",
      },
      max: 1000,
      UItypes: {
        conditions:{
          data: {},
          name: "Condition",
          preview: "",
          UI: [
            {
              element: "typedDropdown",
              storeAs: "conditionType",
              name: "Operand",
              choices: {
                moreThan: {name: "More Than", field: false},
                lessThan: {name: "Less Than", field: false},
                equalsTo: {name: "Equals To", field: false},
                notEqualsTo: {name: "Not Equals To", field: false},
                matchesRegex: {name: "Matches Regex", field: false}
              },
            },
            {
              element: "largeInput",
              storeAs: "compValue",
              name: "Comparison Value",
            },
            "-",
            {
              element: "toggle",
              storeAs: "ignore",
              name: "Do Nothing If Not Matching",
            },
            {
              element: "condition",
              storeAs: "true",
              storeActionsAs: "trueActions",
              name: "If Matches Condition, Run",
            },
          ]
        }
      }
    },
    {
      element: "condition",
      storeAs: "else",
      storeActionsAs: "elseActions",
      name: "If No Matches, Run"
    },
    "-",
    {
      element: "condition",
      storeAs: "falseBack",
      storeActionsAs: "falseBackActions",
      name: "If Condition Doesn't Match, Run"
    }
  ],

  subtitle: (values) => {
    return `Match against ${values.matchConditions.length} conditions.`
  },

  async run(values, interaction, client, bridge){
    let oriValue = bridge.transf(values.input)
    let matches = false

    for (let cnd in values.matchConditions){
      let conditionData = values.matchConditions[cnd].data
      let compValue = bridge.transf(conditionData.compValue)
      let conditionType = bridge.transf(conditionData.conditionType.type)
      let conditionMatch = false

      switch (conditionType){
        case "moreThan":
          if(oriValue > compValue){
            conditionMatch = true
          }
          break

        case "lessThan":
          if(oriValue < compValue){
            conditionMatch = true
          }
          break

        case "equalsTo":
          if(oriValue == compValue){
            conditionMatch = true
          }
          break

        case "notEqualsTo":
          if(oriValue != compValue){
            conditionMatch = true
          }
          break

        case "matchesRegex":
          if (conditionMatch = oriValue.match(new RegExp("^" + compValue + "$", "i"))){
            conditionMatch = true
          }
      }

      if (conditionMatch == true){
        await bridge.call(conditionData.true, conditionData.trueActions)
        matches = true
      }
      else {
        if(conditionData.ignore == false){
          await bridge.call(values.falseBack, values.falseBackActions)
        }
      }
    }

    if (!matches){
      await bridge.call(values.else, values.elseActions)
    }
  }
}