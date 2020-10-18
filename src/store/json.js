export default {
    actions: {
        async createRecord({ dispatch, commit }, url) {
            try {
                return await fetch(url).then(res => res.json()).then(res => res.visits)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}