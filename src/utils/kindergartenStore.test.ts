import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validatePhoneNumber,
  validateEmail,
  formatVND,
  addClass,
  updateClass,
  deleteClass,
  updateSchoolInfo,
  addInquiry,
  updateInquiryStatus,
  filterInquiries,
  filterNewsByCategory,
  validateAndImportBackupJSON,
  exportBackupJSON,
} from './kindergartenStore';
import { INITIAL_KINDERGARTEN_DATA } from './initialData';
import { KindergartenState } from '../types';

test('validatePhoneNumber correctly validates Vietnamese phone numbers', () => {
  assert.equal(validatePhoneNumber('0707609131'), true);
  assert.equal(validatePhoneNumber('0905123456'), true);
  assert.equal(validatePhoneNumber('0707.609.131'), true);
  assert.equal(validatePhoneNumber('0707 609 131'), true);
  assert.equal(validatePhoneNumber('123456789'), false);
  assert.equal(validatePhoneNumber(''), false);
  assert.equal(validatePhoneNumber('090512345678'), false); // too long
});

test('validateEmail validates standard emails', () => {
  assert.equal(validateEmail('admin@bibi.edu.vn'), true);
  assert.equal(validateEmail('phuhuynh@gmail.com'), true);
  assert.equal(validateEmail('invalid-email'), false);
  assert.equal(validateEmail(''), false);
});

test('formatVND formats Vietnamese Dong correctly', () => {
  const formatted = formatVND(3500000);
  assert.ok(formatted.includes('3.500.000') || formatted.includes('3,500,000'));
});

test('School Info updates preserve existing fields', () => {
  const initial = structuredClone(INITIAL_KINDERGARTEN_DATA);
  const updated = updateSchoolInfo(initial, {
    hotline: '0707.609.999',
    slogan: 'Nơi khởi đầu của những ước mơ',
  });

  assert.equal(updated.schoolInfo.hotline, '0707.609.999');
  assert.equal(updated.schoolInfo.slogan, 'Nơi khởi đầu của những ước mơ');
  assert.equal(updated.schoolInfo.address, '37 Phan Văn Trị');
});

test('Class CRUD functions work properly', () => {
  let state: KindergartenState = structuredClone(INITIAL_KINDERGARTEN_DATA);
  const initialCount = state.classes.length;

  // Add class
  state = addClass(state, {
    name: 'Lớp STEAM Thí Nghiệm Nhí',
    ageGroup: '3 - 5 tuổi',
    capacity: 15,
    enrolledCount: 5,
    feePerMonth: 4000000,
    steamFocus: 'Thí nghiệm vật lý ứng dụng',
    description: 'Lớp học thí nghiệm vui',
    features: ['Thực hành mỗi ngày', 'Kính bảo hộ nhí'],
    imageUrl: 'https://example.com/class.jpg',
    teacherLead: 'Cô Lan',
  });

  assert.equal(state.classes.length, initialCount + 1);
  const added = state.classes[state.classes.length - 1];
  assert.equal(added.name, 'Lớp STEAM Thí Nghiệm Nhí');

  // Update class
  state = updateClass(state, added.id, {
    enrolledCount: 6,
    feePerMonth: 4200000,
  });
  const updatedClass = state.classes.find((c) => c.id === added.id);
  assert.equal(updatedClass?.enrolledCount, 6);
  assert.equal(updatedClass?.feePerMonth, 4200000);

  // Delete class
  state = deleteClass(state, added.id);
  assert.equal(state.classes.length, initialCount);
  assert.equal(state.classes.find((c) => c.id === added.id), undefined);
});

test('Admission Inquiry submission and lifecycle updates', () => {
  let state: KindergartenState = structuredClone(INITIAL_KINDERGARTEN_DATA);
  const initialCount = state.inquiries.length;

  const result = addInquiry(state, {
    parentName: 'Nguyễn Văn An',
    phone: '0905111222',
    email: 'an.nguyen@test.com',
    childName: 'Bé An Nhiên',
    childAgeOrDob: '2 tuổi',
    targetClass: 'Lớp Nhà Trẻ Lớn',
    preferredVisitDate: '2026-11-10',
    notes: 'Muốn tìm hiểu thực đơn và camera của trường',
  });

  state = result.newState;
  assert.equal(state.inquiries.length, initialCount + 1);
  const newInq = result.newInquiry;
  assert.equal(newInq.status, 'new');

  // Update status to contacted
  state = updateInquiryStatus(state, newInq.id, 'contacted', 'Đã gọi tư vấn qua điện thoại');
  const found = state.inquiries.find((i) => i.id === newInq.id);
  assert.equal(found?.status, 'contacted');
  assert.equal(found?.staffNotes, 'Đã gọi tư vấn qua điện thoại');

  // Filter inquiries
  const filtered = filterInquiries(state.inquiries, 'An Nhiên', 'all');
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].childName, 'Bé An Nhiên');

  const filteredByPhone = filterInquiries(state.inquiries, '0905111', 'all');
  assert.equal(filteredByPhone.length, 1);
});

test('News filter by category works accurately', () => {
  const state = structuredClone(INITIAL_KINDERGARTEN_DATA);
  const steamNews = filterNewsByCategory(state.news, 'STEAM & Trải nghiệm');
  assert.ok(steamNews.every((n) => n.category === 'STEAM & Trải nghiệm'));

  const allNews = filterNewsByCategory(state.news, 'Tất cả');
  assert.equal(allNews.length, state.news.length);
});

test('Backup JSON export and import validation', () => {
  const state = structuredClone(INITIAL_KINDERGARTEN_DATA);
  const jsonStr = exportBackupJSON(state);
  assert.ok(jsonStr.includes('Trường Mầm non BiBi Thiên Nga'));

  const restored = validateAndImportBackupJSON(jsonStr);
  assert.equal(restored.schoolInfo.name, state.schoolInfo.name);
  assert.equal(restored.classes.length, state.classes.length);

  assert.throws(() => {
    validateAndImportBackupJSON('{"invalid": true}');
  });
});
