import * as types from './sidemenu.types'

const initialState = {
    hidden: true
};

export const toggleSidebarMenu = () => async (dispatch) => {
    dispatch({
        type: types.SIDEBAR_MENU_TOGGLE
    })
}

export const initialSidebarMenu = () => async (dispatch) => {
    dispatch({
        type: types.CLEAN_MENU
    })
}
