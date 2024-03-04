import { combineReducers } from "redux";
import {personnelReducer} from './personnel/personnel.reducers.js';
import {assetsReducer} from './itAssets/itAssets.reducer.js';
import {entityReducer} from './entity/entity.reducers.js';
import {activitiesReducer} from './activities/activities.reducers.js';
import {equipmentsReducer} from './equipments/equipments.reducers.js';
import {sidebarMenuReducer} from './menu-sidebar/sidemenu.reducers.js';
import {authReducer} from './auth/auth.reducer.js';

export default combineReducers({
  auth: authReducer,
  personnelList: personnelReducer,
  assetsList: assetsReducer,
  entityList: entityReducer,
  activityList: activitiesReducer,
  equipmentsList:equipmentsReducer,
  sidebarMenu: sidebarMenuReducer
});