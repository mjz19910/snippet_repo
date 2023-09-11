import {A_ChangeEngagementPanelVisibility,A_HideEngagementPanelScrim,A_SetActivePanelItem} from "../../abc/A.js";
import {C_ChangeMarkersVisibility,C_EngagementPanelHeaderShowNavigationButton,C_EntityUpdate,C_Loop,C_RepeatChapter,C_ScrollToEngagementPanel,C_UpdateToggleButtonState} from "../../abc/C.js";
import {D_Survey_Watch,D_PaidDigitalGoods} from "../../d/group_D/D.js";
import {E_VE3611,E_VE5754,E_VE6827} from "../../e/GR_E_VE.js";
import {TA_OpenPopup_Empty} from "../../nop_q/Popup.js";

export type G_DC_CommandExecutor_CommandItem=
	|A_ChangeEngagementPanelVisibility
	|A_HideEngagementPanelScrim
	|C_ChangeMarkersVisibility
	|C_EngagementPanelHeaderShowNavigationButton
	|C_EntityUpdate
	|C_Loop
	|C_RepeatChapter
	|C_ScrollToEngagementPanel
	|C_UpdateToggleButtonState
	|E_Like
	|TA_OpenPopup_Empty
	;
;
export type G_DC_GetSurvey_Endpoint=D_Survey_Watch|D_PaidDigitalGoods;
export type G_DC_Innertube=
	|A_ChangeEngagementPanelVisibility
	|A_SetActivePanelItem
	|E_Url
	|E_VE3611
	|E_VE5754
	|E_VE6827
	|E_Watch
	|E_YpcGetOfflineUpsell
	;
;
