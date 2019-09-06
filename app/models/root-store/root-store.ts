import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { NavigationStoreModel } from "../../navigation/navigation-store"
import { createFoodListModel } from '../firebase/food_list'
import { createStorageModel } from '../storage'
import { createRecipesModel } from '../firebase/recipes'

/**
 * An RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  navigationStore: types.optional(NavigationStoreModel, {}),
  foodList: createFoodListModel(),
  storage: createStorageModel(),
  recipes: createRecipesModel()
})

/**
 * The RootStore instance.
 */
export type RootStore = Instance<typeof RootStoreModel>

/**
 * The data of an RootStore.
 */
export type RootStoreSnapshot = SnapshotOut<typeof RootStoreModel>
