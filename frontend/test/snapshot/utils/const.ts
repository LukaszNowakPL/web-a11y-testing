// Indication for Lighthouse audit to make tests fail if any metric score below given level
export const LIGHTHOUSE_SNAPSHOT_THRESHOLDS = {'best-practices': 100, accessibility: 90, seo: 50};

// Subfolder to snapshotPathTemplate part of Playwright config setting. Directory for aria static snapshots
export const ARIA_SNAPSHOTS_DIRECTORY = 'aria';
