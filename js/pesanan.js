document.addEventListener('DOMContentLoaded', function() {
    const uploadBox = document.getElementById('upload-box');
    const fileInput = document.getElementById('foto-barang');
    const uploadHint = uploadBox.querySelector('.upload-hint');
    const uploadText = uploadBox.querySelector('span:first-child');

    uploadBox.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            uploadText.textContent = 'File Terpilih:';
            uploadHint.textContent = e.target.files[0].name;
            uploadBox.style.borderColor = '#1a56db';
        }
    });

    const layananContainer = document.getElementById('layanan-container');
    const btnTambahPesanan = document.getElementById('btn-tambah-pesanan');

    if (layananContainer) {
        layananContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('layanan-btn')) {
                const optionsContainer = e.target.closest('.layanan-options');
                const btns = optionsContainer.querySelectorAll('.layanan-btn');
                
                for (let i = 0; i < btns.length; i++) {
                    btns[i].classList.remove('active');
                }
                
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
                const semuaGroup = document.querySelectorAll('.layanan-group');
                
                if (semuaGroup.length > 1) {
                    groupToRemove.remove();
                }
            }
        });
    }

    if (btnTambahPesanan) {
        btnTambahPesanan.addEventListener('click', function() {
            const firstGroup = document.querySelector('.layanan-group');
            if (firstGroup) {
                const clone = firstGroup.cloneNode(true);

                const mainOptions = clone.querySelector('.main-layanan-options');
                if (mainOptions) {
                    const mainBtns = mainOptions.querySelectorAll('.layanan-btn');
                    for (let i = 0; i < mainBtns.length; i++) {
                        mainBtns[i].classList.remove('active');
                    }
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
        openBtn.addEventListener('click', function() {
            const mainBtns = document.querySelectorAll('.main-layanan-options .layanan-btn.active');
            const arrayLayanan = [];
            for (let i = 0; i < mainBtns.length; i++) {
                arrayLayanan.push(mainBtns[i].textContent.trim());
            }

            const paketBtns = document.querySelectorAll('.paket-section .layanan-btn.active');
            const arrayPaket = [];
            for (let i = 0; i < paketBtns.length; i++) {
                arrayPaket.push(paketBtns[i].textContent.trim());
            }

            const summaryLayanan = document.getElementById('summary-layanan');
            if (summaryLayanan) {
                if (arrayLayanan.length > 0) {
                    summaryLayanan.textContent = arrayLayanan.join(', ');
                } else {
                    summaryLayanan.textContent = 'Belum Dipilih';
                }
            }

            const summaryPaket = document.getElementById('summary-paket');
            if (summaryPaket) {
                if (arrayPaket.length > 0) {
                    summaryPaket.textContent = arrayPaket.join(', ');
                } else {
                    summaryPaket.textContent = '-';
                }
            }

            const summaryJadwal = document.getElementById('summary-jadwal');
            const dateElem = document.getElementById('date-text');
            const timeElem = document.getElementById('time-text');
            
            let dateText = "-";
            if (dateElem) {
                dateText = dateElem.textContent.trim();
            }

            let timeText = "-";
            if (timeElem) {
                timeText = timeElem.textContent.trim();
            }

            if (summaryJadwal) {
                summaryJadwal.textContent = dateText + ", " + timeText;
            }

            modal.style.display = 'flex';
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Handling simulated Date Time inputs
    const dateBtn = document.getElementById('date-picker-btn');
    const dateInput = document.getElementById('date-input');
    const dateTextLabel = document.getElementById('date-text');

    if (dateBtn) {
        dateBtn.addEventListener('click', function() {
            if (dateInput.showPicker) {
                dateInput.showPicker();
            }
        });
        dateInput.addEventListener('change', function(e) {
            dateTextLabel.textContent = e.target.value; 
        });
    }

    const timeBtn = document.getElementById('time-picker-btn');
    const timeInput = document.getElementById('time-input');
    const timeTextLabel = document.getElementById('time-text');

    if (timeBtn) {
        timeBtn.addEventListener('click', function() {
            if (timeInput.showPicker) {
                timeInput.showPicker();
            }
        });
        timeInput.addEventListener('change', function(e) {
            timeTextLabel.textContent = e.target.value;
        });
    }
});
