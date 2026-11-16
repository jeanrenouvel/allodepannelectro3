// Navigation mobile, année du pied de page et formulaire de contact.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const subject = `Demande de devis - ${data.get('subject')}`;
      const body = [
        `Nom : ${data.get('name')}`,
        `E-mail : ${data.get('email')}`,
        `Téléphone : ${data.get('phone') || 'Non renseigné'}`,
        `Appareil : ${data.get('subject')}`,
        '',
        'Description de la panne :',
        data.get('message')
      ].join('\n');
      const mailto = `mailto:jean.renouvel@allodepann-electronic.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const note = document.getElementById('form-note');
      if (note) note.textContent = "Votre logiciel de messagerie va s'ouvrir avec votre demande préremplie. Vérifiez puis envoyez l'e-mail.";
      window.location.href = mailto;
    });
  }
});
