import test from 'node:test';
import assert from 'node:assert/strict';
import { testR2Connection, listR2Files, uploadToR2, deleteFromR2 } from './r2Service';

test('Cloudflare R2 connection and bucket accessibility', async () => {
  const result = await testR2Connection();
  console.log('R2 Connection test result:', result);
  assert.equal(result.bucket, 'bibimage');
  assert.equal(result.ok, true, `Connection failed: ${result.message}`);
});

test('Cloudflare R2 upload, list, and delete workflow', async () => {
  const sampleData = Buffer.from('Test image buffer from BiBi Thien Nga STEAM Preschool');
  const uploaded = await uploadToR2(sampleData, 'test-cloud-file.txt', 'text/plain', 'tests');
  
  assert.ok(uploaded.key.startsWith('tests/'));
  assert.equal(uploaded.size, sampleData.length);
  console.log('Uploaded key:', uploaded.key);

  // List to confirm presence
  const files = await listR2Files('tests/');
  assert.ok(files.some(f => f.key === uploaded.key));

  // Clean up
  const deleted = await deleteFromR2(uploaded.key);
  assert.equal(deleted, true);
});
