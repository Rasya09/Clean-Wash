document.addEventListener('DOMContentLoaded', () => {
    const uploadBox = document.getElementById('upload-box');
    const fileInput = document.getElementById('foto-barang');
    const uploadHint = uploadBox.querySelector('.upload-hint');
    const uploadText = uploadBox.querySelector('span:first-child');

    uploadBox.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
            uploadText.textContent = 'File Terpilih:';
            uploadHint.textContent = e.target.files[0].name;
            uploadBox.style.borderColor = 'var(--primary)';
        }
    });

    const layananContainer = document.getElementById('layanan-container');
    const btnTambahPesanan = document.getElementById('btn-tambah-pesanan');

    if (layananContainer) {
        layananContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('layanan-btn')) {
                const optionsContainer = e.target.closest('.layanan-options');
                const btns = optionsContainer.querySelectorAll('.layanan-btn');
                btns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                if (optionsContainer.classList.contains('main-layanan-options')) {
                    const group = e.target.closest('.layanan-group');
                    const paketSection = group.querySelector('.paket-section');
                    const type = e.target.textContent.trim();
                    
                    if (paketSection) {
                        const optionDiv = paketSection.querySelector('.layanan-options');
                        let innerButtons = "";
                        
                        if (type === 'Cuci Kiloan' || type === 'Cuci Satuan') {
                            paketSection.style.display = 'block';
                            innerButtons = `
                                <button class="layanan-btn">Cuci Saja</button>
                                <button class="layanan-btn">Cuci + Setrika</button>
                                <button class="layanan-btn">Express</button>
                            `;
                        } else if (type === 'Cuci Karpet' || type === 'Cuci Tas') {
                            paketSection.style.display = 'block';
                            innerButtons = `
                                <button class="layanan-btn">Kecil</button>
                                <button class="layanan-btn">Sedang</button>
                                <button class="layanan-btn">Besar</button>
                            `;
                        } else if (type === 'Cuci Sepatu') {
                            paketSection.style.display = 'none';
                        }

                        if (innerButtons && optionDiv) {
                            optionDiv.innerHTML = innerButtons;
                        }
                    }
                }
            }

            const removeBtn = e.target.closest('.btn-remove-layanan');
            if (removeBtn) {
                const groupToRemove = removeBtn.closest('.layanan-group');
                if (document.querySelectorAll('.layanan-group').length > 1) {
                    groupToRemove.remove();
                }
            }
        });
    }

    if (btnTambahPesanan) {
        btnTambahPesanan.addEventListener('click', () => {
            const firstGroup = document.querySelector('.layanan-group');
            if (firstGroup) {
                const clone = firstGroup.cloneNode(true);

                const mainOptions = clone.querySelector('.main-layanan-options');
                if (mainOptions) {
                    const mainBtns = mainOptions.querySelectorAll('.layanan-btn');
                    mainBtns.forEach(b => b.classList.remove('active'));
                }

                const paketSection = clone.querySelector('.paket-section');
                if (paketSection) {
                    paketSection.style.display = 'none';
                    const optionDiv = paketSection.querySelector('.layanan-options');
                    if (optionDiv) {
                        optionDiv.innerHTML = `
                            <button class="layanan-btn">Cuci Saja</button>
                            <button class="layanan-btn">Cuci + Setrika</button>
                            <button class="layanan-btn">Express</button>
                        `;
                    }
                }
                
                const tambahContainer = document.querySelector('.tambah-pesanan');
                layananContainer.insertBefore(clone, tambahContainer);
            }
        });
    }

    // Modal Pesanan Handling
    const modal = document.getElementById('pesananModal');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.getElementById('closeModalBtn');

    if (openBtn && modal) {
        openBtn.addEventListener('click', () => {
            const activeLayanan = Array.from(document.querySelectorAll('.main-layanan-options .layanan-btn.active')).map(btn => btn.textContent.trim());
            const activePaket = Array.from(document.querySelectorAll('.paket-section .layanan-btn.active')).map(btn => btn.textContent.trim());
            const summaryLayanan = document.getElementById('summary-layanan');
            const summaryPaket = document.getElementById('summary-paket');
            const summaryJadwal = document.getElementById('summary-jadwal');
            const dateText = document.getElementById('date-text') ? document.getElementById('date-text').textContent.trim() : '-';
            const timeText = document.getElementById('time-text') ? document.getElementById('time-text').textContent.trim() : '-';
            
            if (summaryLayanan) summaryLayanan.textContent = activeLayanan.length > 0 ? activeLayanan.join(', ') : 'Belum Dipilih';
            if (summaryPaket) summaryPaket.textContent = activePaket.length > 0 ? activePaket.join(', ') : '-';
            if (summaryJadwal) summaryJadwal.textContent = `${dateText}, ${timeText}`;

            modal.style.display = 'flex';
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Handling simulated Date Time inputs
    const dateBtn = document.getElementById('date-picker-btn');
    const dateInput = document.getElementById('date-input');
    const dateText = document.getElementById('date-text');

    if(dateBtn) {
        dateBtn.addEventListener('click', () => {
            if (typeof dateInput.showPicker === 'function') {
                dateInput.showPicker();
            }
        });
        dateInput.addEventListener('change', (e) => {
            dateText.textContent = e.target.value; 
        });
    }

    const timeBtn = document.getElementById('time-picker-btn');
    const timeInput = document.getElementById('time-input');
    const timeText = document.getElementById('time-text');

    if(timeBtn) {
        timeBtn.addEventListener('click', () => {
            if (typeof timeInput.showPicker === 'function') {
                timeInput.showPicker();
            }
        });
        timeInput.addEventListener('change', (e) => {
            timeText.textContent = e.target.value;
        });
    }
});
