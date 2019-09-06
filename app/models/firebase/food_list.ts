import { types, flow, applySnapshot } from 'mobx-state-tree'
import { firestore } from 'react-native-firebase'


export const FoodItem = types.model({
    name: types.string,
    desc: types.optional(types.string, ''),
    cat: types.optional(types.string, ''),
    id: types.identifier,
    allowed: types.boolean
})


export const FoodList = types.model().props({
        list: types.optional(types.array(FoodItem),[]),
        selected:  types.maybe(types.reference(FoodItem))
})
.actions(self => ({
     afterCreate() {
        this.fetchFoodList()
    },
    fetchFoodList: flow(function * () {
         firestore().collection('food_list').onSnapshot(function(querySnapshot) {
            const list = []
            querySnapshot.forEach(function(doc) {
            list.push(doc.data())
        })
                applySnapshot(self.list, list)
    })
  }),
  setSelectedItem: (selected: any) => {
    self.selected = selected
  }
}))

export const defaults = {}
export const createFoodListModel = () => types.optional(FoodList, defaults as any) 

type FoodListType = typeof FoodList.Type
export interface FoodList extends FoodListType {}
