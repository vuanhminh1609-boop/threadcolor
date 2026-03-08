export function createPaletteState({ teamRoleViewer = "viewer", roomShareInviteOnly = "inviteOnly" } = {}) {
  return {
    palettes: [],
    hashPalette: null,
    selectedPaletteId: "",
    lockedSlots: {},
    generatorStops: [],
    roleMapByPaletteId: new Map(),
    previewTabByPaletteId: new Map(),
    previewVisionModeByPaletteId: new Map(),
    libraryPresets: [],
    libraryLoaded: false,
    libraryLoading: false,
    librarySaveDraft: null,
    librarySaveBusy: false,
    libraryScope: "personal",
    teams: [],
    teamsLoaded: false,
    teamsLoading: false,
    selectedTeamId: "",
    selectedTeamRole: teamRoleViewer,
    teamGuidelineByTeamId: new Map(),
    approvalHistoryByPresetId: new Map(),
    releaseById: new Map(),
    room: {
      id: "",
      name: "",
      role: teamRoleViewer,
      shareMode: roomShareInviteOnly,
      status: "idle",
      readOnly: false,
      active: false,
      baseRev: 0,
      currentFingerprint: "",
      pendingFingerprint: "",
      pendingPayload: null,
      pendingDirty: false,
      invalidStateNotified: false,
      selfUid: "",
      selfDisplayName: "",
      presenceByUid: new Map(),
      revisions: [],
      revisionStatus: "idle",
      revisionPreviewId: "",
      lastRevisionAtMs: 0,
      lastRevisionSnapshot: null,
      comments: [],
      commentStatus: "idle",
      commentFilterRole: "all",
      commentReplyRootId: ""
    }
  };
}

export function createImageExtractState() {
  return {
    file: null,
    scaled: null,
    stops: []
  };
}
