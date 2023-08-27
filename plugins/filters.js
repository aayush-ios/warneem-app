import Vue from 'vue';

Vue.filter('formatDate', function(value) {
  if (!value) return '';
  const d = new Date(value);
  const year = d.getFullYear();
  const month = (1 + d.getMonth()).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${year}-${day}-${month}`;
});
