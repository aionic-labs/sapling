/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {CommitChange, DiffWithCommitIDs} from './github/diffTypes';

const EMPTY_CHANGES: CommitChange[] = [];

export type FileTreeComparison = {
  key: string;
  changes: CommitChange[];
};

/**
 * Keeps the file navigator scoped to the exact commit pair shown by the diff.
 * The key remounts the navigator when the selected versions change so its
 * filter, collapsed directories, and selected file cannot leak across
 * comparisons.
 */
export function getFileTreeComparison(
  versionDiff: DiffWithCommitIDs | null,
): FileTreeComparison {
  const commitIDs = versionDiff?.commitIDs;
  return {
    key:
      commitIDs == null
        ? 'comparison-unavailable'
        : `${commitIDs.before}:${commitIDs.after}`,
    changes: versionDiff?.diff ?? EMPTY_CHANGES,
  };
}
