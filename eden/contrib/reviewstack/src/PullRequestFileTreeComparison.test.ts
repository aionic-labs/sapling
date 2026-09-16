/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {AddChange, DiffWithCommitIDs} from './github/diffTypes';

import {getFileTreeComparison} from './PullRequestFileTreeComparison';

describe('getFileTreeComparison', () => {
  test('uses only the files from the selected commit comparison', () => {
    const version4To5 = createComparison('version-4', 'version-5', [
      createAddChange('only-in-version-5.ts'),
    ]);

    expect(getFileTreeComparison(version4To5)).toEqual({
      key: 'version-4:version-5',
      changes: version4To5.diff,
    });
  });

  test('changes identity when either selected version changes', () => {
    const version3To4 = createComparison('version-3', 'version-4', [
      createAddChange('only-in-version-4.ts'),
    ]);
    const version4To5 = createComparison('version-4', 'version-5', [
      createAddChange('only-in-version-5.ts'),
    ]);

    expect(getFileTreeComparison(version3To4).key).not.toBe(
      getFileTreeComparison(version4To5).key,
    );
    expect(getFileTreeComparison(version4To5).changes).toEqual(version4To5.diff);
    expect(getFileTreeComparison(version4To5).changes).not.toContain(version3To4.diff[0]);
  });
});

function createComparison(
  before: string,
  after: string,
  diff: AddChange[],
): DiffWithCommitIDs {
  return {diff, commitIDs: {before, after}};
}

function createAddChange(path: string): AddChange {
  const slash = path.lastIndexOf('/');
  return {
    type: 'add',
    basePath: slash === -1 ? '' : path.slice(0, slash),
    entry: {
      oid: path,
      name: slash === -1 ? path : path.slice(slash + 1),
      path,
      type: 'blob',
      mode: 0o100644,
    },
  };
}
