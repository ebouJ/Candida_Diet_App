import { types, flow, applySnapshot } from 'mobx-state-tree'
import { firestore } from 'react-native-firebase'


const FoodItem = types.model({
    name: types.string,
    desc: types.string,
    cat: types.string,
    id: types.identifier,
    allowed: types.boolean
})


export const FoodList = types.model().props({
        list: types.maybe(types.array(FoodItem)),
})
.actions(self => ({
     afterCreate() {
        this.fetchFoodList()
    },
    fetchFoodList: flow(function * () {
        yield firestore().collection('food_list').onSnapshot(function(querySnapshot) {
            const list = []
            querySnapshot.forEach(function(doc) {
            list.push(doc.data())
        })
        applySnapshot(self.list, list)
    })
  }),

  addFoodList: flow(function* () {
      
  })
}))

export const defaults = {}
export const createFoodListModel = () => types.optional(FoodList, defaults as any) // Using any because https://github.com/mobxjs/mobx-state-tree/issues/1307

type FoodListType = typeof FoodList.Type
export interface FoodList extends FoodListType {}
