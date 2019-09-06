import { types, flow, applySnapshot, onSnapshot } from 'mobx-state-tree'
import * as storage from "../../utils/storage"

export const KeyItem = types.model({
    key: types.string
})

/* @TODO
This model can be optimize heavily for better performance.
This is up for contribution.
Use map with keys and values instead of having two different maps
*/

export const UserVoteStorage = types.model().props({
        yesVotes: types.optional(types.array(types.string),[]),
        noVotes: types.optional(types.array(types.string),[]),
})
.actions(self => ({
    afterCreate(){
          this.getKeys()
          onSnapshot(self,this.updateAsynStrogage)
    },
    getKeys: flow(function * () {
        const yesKeys = yield storage.load('yesVotes')
        const noKeys = yield storage.load('noKeys')
        if(!yesKeys || !noKeys){
            if(!yesKeys)
                yield storage.save('yesVotes', [])
            if(!noKeys)
                yield storage.save('noKeys', [])
            return;
        }
        applySnapshot(self.yesVotes,yesKeys)
        applySnapshot(self.noVotes,noKeys)

   }),
   addKey: flow(function* (key: string, type: string){
        if(type === 'yesVotes'){
            self.yesVotes.push(key)
           const filtered = self.noVotes.filter(item => item !== key)
           applySnapshot(self.noVotes,filtered) 
        } else if ( type === 'noVotes'){
            self.noVotes.push(key)
            const filtered = self.yesVotes.filter(item => item !== key)
            applySnapshot(self.yesVotes,filtered) 

        }
   }),
   removeKey: flow(function* (key: string){

   }),
   updateAsynStrogage: flow(function* (){
            yield storage.save('yesVotes', self.yesVotes)
            yield storage.save('noKeys', self.noVotes)
   })
}))

export const defaults = {}
export const createStorageModel = () => types.optional(UserVoteStorage, defaults as any) 

type UserVoteStorageType = typeof UserVoteStorage.Type
export interface Storage extends UserVoteStorageType {}
