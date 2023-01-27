type T_MutType<T extends string>=T_EnumStr<"ENTITY_MUTATION_TYPE",T>;
type G_EY_Entity=
	|EY_Offlineability
	|S_EY_Subscription
	|S_EY_PlaylistLoop
	|EY_TranscriptTrackSelection
	|S_EY_TranscriptSearchBox
	;
;
type EY_Offlineability={offlineabilityEntity: D_EY_Offlineability;};
type D_EY_Offlineability={
	key: string;
	command: C_Innertube;
	addToOfflineButtonState: D_AddToOfflineButtonState;
	contentCheckOk: false;
	racyCheckOk: false;
	loggingDirectives: D_LoggingDirectives;
};
type D_AddToOfflineButtonState=T_EnumStr<
	"ADD_TO_OFFLINE_BUTTON_STATE",[
		"UNKNOWN",
		"ENABLED"
	][number]
>;
type S_EY_Subscription={subscriptionStateEntity: DS_EY_Subscription;};
type DS_EY_Subscription={key: string; subscribed: true;};
type S_EY_PlaylistLoop={playlistLoopStateEntity: DS_EY_PlaylistLoop;};
type DS_EY_PlaylistLoop={key: string; state: T_EnumStr<"PLAYLIST_LOOP_STATE","NONE">;};
type EY_TranscriptTrackSelection={transcriptTrackSelectionEntity: DS_EY_TranscriptTrackSelection;};
type DS_EY_TranscriptTrackSelection={key: string; selectedTrackIndex: 0; serializedParams: string;};
type S_EY_TranscriptSearchBox={transcriptSearchBoxStateEntity: DS_EY_TranscriptSearchBox;};
type DS_EY_TranscriptSearchBox={key: string; isHidden: false;};
namespace NS_DiscriminatedEnums {
	type DE_MutationReplace={type: T_MutType<"REPLACE">; entityKey: string; payload: G_EY_Entity;};
	type DE_MutationDelete={type: T_MutType<"DELETE">; entityKey: string; options: DE_PersistenceOption;};
	export type D_EntityMutationItem=DE_MutationReplace|DE_MutationDelete;
}