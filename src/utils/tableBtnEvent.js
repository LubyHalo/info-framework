import store from '@/store/index'

export function addDialog () {
    store.dispatch('openDialog')
    store.dispatch('editRow')
}

export function detailDialog (rowData) {
    store.dispatch('openDialog')
    store.dispatch('detailRow')
    store.dispatch('loadData', rowData)
}

export function editDialog (rowData) {
    store.dispatch('openDialog')
    store.dispatch('editRow')
    store.dispatch('loadData', rowData)
}

export function closeDialog () {
    store.dispatch('closeDialog')
    store.dispatch('editRow')
    store.dispatch('clearData')
}