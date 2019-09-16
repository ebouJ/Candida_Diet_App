import { types, flow, applySnapshot } from 'mobx-state-tree'
import { firestore } from 'react-native-firebase'


export const RecipeItem = types.model({
    id: types.identifier,
    name: types.string,
    prep_time: types.string,
    cook_time: types.string,
    total_time: types.string,
    calories: types.string,
    ingridients: types.array(types.string),
    instructions: types.array(types.string),
    recipe_cat: types.string,
    picture_url: types.string,
})


export const RecipeList = types.model().props({
    breakfast: types.optional(types.array(RecipeItem), []),
    lunch: types.optional(types.array(RecipeItem), []),
    dinner: types.optional(types.array(RecipeItem), []),
    snacks: types.optional(types.array(RecipeItem), []),
    selected: types.maybe(types.reference(RecipeItem)),
})
    .actions(self => ({
        afterCreate() {
            try{
                this.fetcRecipes()
            }catch(e){ console.log(e)}
           
        },
        fetcRecipes: flow(function* () {
            function groupBy(list, keyGetter) {
                const map = new Map();
                list.forEach((item) => {
                     const key = keyGetter(item);
                     const collection = map.get(key);
                     if (!collection) {
                         map.set(key, [item]);
                     } else {
                         collection.push(item);
                     }
                });
                return map;
            }
            firestore().collection('recipes').onSnapshot(function (querySnapshot) {
                const list = []
                querySnapshot.forEach(function (doc) {
                    list.push(doc.data())
                })
                const recipes = groupBy(list, item => item.recipe_cat)

                applySnapshot(self.breakfast, recipes.get('breakfast'))
                applySnapshot(self.lunch, recipes.get('lunch'))
                applySnapshot(self.dinner, recipes.get('dinner'))
     
            })
        }),
        setSelectedItem: (selected) => {
            console.log(selected)
            self.selected = selected
        }
    }))

export const defaults = {}
export const createRecipesModel = () => types.optional(RecipeList, defaults as any)

type RecipeListType = typeof RecipeList.Type
export interface RecipeList extends RecipeListType { }