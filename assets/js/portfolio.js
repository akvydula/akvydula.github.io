(function () {
	'use strict';

	var navLinks = document.querySelectorAll('.main-nav a[data-tab]');
	var panels = document.querySelectorAll('.panel[data-panel]');

	function setActive(tabId) {
		// Update nav
		navLinks.forEach(function (a) {
			if (a.getAttribute('data-tab') === tabId) {
				a.classList.add('active');
			} else {
				a.classList.remove('active');
			}
		});
		// Update panels
		panels.forEach(function (panel) {
			if (panel.getAttribute('data-panel') === tabId) {
				panel.classList.add('active');
			} else {
				panel.classList.remove('active');
			}
		});
		// Update URL hash without jumping
		var newHash = tabId === 'home' ? '' : tabId;
		if (history.replaceState) {
			history.replaceState(null, null, newHash ? '#' + newHash : window.location.pathname);
		} else {
			window.location.hash = newHash ? '#' + newHash : '';
		}
	}

	function handleClick(e) {
		var a = e.target.closest('a[data-tab]');
		if (!a) return;
		e.preventDefault();
		setActive(a.getAttribute('data-tab'));
	}

	function readHash() {
		var hash = window.location.hash.slice(1);
		if (hash && document.getElementById(hash)) {
			setActive(hash);
		} else {
			setActive('home');
		}
	}

	// Nav click
	document.querySelector('.main-nav').addEventListener('click', handleClick);
	// Site name click
	document.querySelector('.site-name').addEventListener('click', function (e) {
		e.preventDefault();
		setActive('home');
	});

	// Initial state and hash change
	readHash();
	window.addEventListener('hashchange', readHash);

	// Expandable cards (Research & Community)
	document.querySelectorAll('[data-card]').forEach(function (card) {
		var preview = card.querySelector('.card-preview');
		var closeBtn = card.querySelector('.card-close');
		function open() {
			card.classList.add('expanded');
		}
		function close() {
			card.classList.remove('expanded');
		}
		if (preview) {
			preview.addEventListener('click', function (e) {
				if (!card.classList.contains('expanded')) open();
			});
		}
		if (closeBtn) {
			closeBtn.addEventListener('click', function (e) {
				e.stopPropagation();
				close();
			});
		}
	});
})();
