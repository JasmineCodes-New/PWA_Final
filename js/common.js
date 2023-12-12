document.addEventListener('DOMContentLoaded', () => {
  // Nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, { edge: 'left' });
  // Add contacts form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, { edge: 'right' });
});
