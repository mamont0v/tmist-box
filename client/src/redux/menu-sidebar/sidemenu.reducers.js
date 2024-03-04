import * as types from './sidemenu.types'

const initialState = {
    hidden: true
}

export const sidebarMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SIDEBAR_MENU_TOGGLE:
            return {
                ...state,
                hidden: !state.hidden
            };
        case types.CLEAN_MENU: // Обработка действия выхода из системы
            return {
                ...initialState // Сброс к начальному состоянию
            };
        default:
            return state;
    }
};