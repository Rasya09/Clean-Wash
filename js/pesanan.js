document.addEventListener('DOMContentLoaded', function() {
    const uploadBox = document.getElementById('upload-box');
    const fileInput = document.getElementById('foto-barang');
    const uploadHint = document.getElementById('upload-hint');
    const uploadText = document.getElementById('upload-text');

    if (uploadBox && fileInput) {
        uploadBox.addEventListener('click', function() {
            fileInput.click();
        });

        fileInput.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                if (uploadText) uploadText.textContent = 'File Foto Anda:';
                if (uploadHint) uploadHint.textContent = e.target.files[0].name;
                uploadBox.style.borderColor = '#6d93f2';
                uploadBox.style.backgroundColor = '#eaeffc';
            }
        });
    }

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
                                <button type="button" class="layanan-btn">Cuci Saja</button>
                                <button type="button" class="layanan-btn">Cuci + Setrika</button>
                                <button type="button" class="layanan-btn">Express</button>
                            `;
                        } else if (type === 'Cuci Karpet' || type === 'Cuci Tas') {
                            paketSection.style.display = 'block';
                            innerButtons = `
                                <button type="button" class="layanan-btn">Kecil</button>
                                <button type="button" class="layanan-btn">Sedang</button>
                                <button type="button" class="layanan-btn">Besar</button>
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
                    // Rename sequentially 
                    document.querySelectorAll('.layanan-group').forEach((g, index) => {
                       const h3 = g.querySelector('h3');
                       if (h3 && h3.textContent.startsWith('Pilih Layanan')) {
                            h3.textContent = index === 0 ? 'Pilih Layanan' : `Pilih Layanan ${index + 1}`;
                       }
                    });
                }
            }
        });
    }

    if (btnTambahPesanan) {
        btnTambahPesanan.addEventListener('click', function() {
            const groups = document.querySelectorAll('.layanan-group');
            const newIndex = groups.length + 1;
            
            const firstGroup = groups[0];
            if (firstGroup) {
                const clone = firstGroup.cloneNode(true);
                
                const h3 = clone.querySelector('h3');
                if (h3) h3.textContent = `Pilih Layanan ${newIndex}`;
                
                // Tampilkan border top di CSS style khusus clone lewat kode inline gampang
                clone.style.borderTop = '1.5px dashed #e0e6ed';
                clone.style.paddingTop = '24px';
                clone.style.marginTop = '8px';

                // Ensure the remove button will be visible for cloned
                const removeBtn = clone.querySelector('.btn-remove-layanan');
                if(removeBtn) {
                    removeBtn.style.display = 'flex';
                }

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
                            <button type="button" class="layanan-btn">Cuci Saja</button>
                            <button type="button" class="layanan-btn">Cuci + Setrika</button>
                            <button type="button" class="layanan-btn">Express</button>
                        `;
                    }
                }
                
                const tambahContainer = document.querySelector('.tambah-pesanan');
                layananContainer.insertBefore(clone, tambahContainer);
            }
        });
    }

    // Capture pesanan and save to local storage on submit
    const orderForm = document.querySelector('.order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            const layananTerpilih = [];
            const paketTerpilih = [];

            document.querySelectorAll('.layanan-group').forEach(group => {
                const activeLayanan = group.querySelector('.main-layanan-options .layanan-btn.active');
                if (activeLayanan) {
                    layananTerpilih.push(activeLayanan.textContent.trim());
                }

                // Periksa paket-section yang terbuka di grup ini
                const activeSections = group.querySelectorAll('.paket-section');
                activeSections.forEach(section => {
                    if (section.style.display === 'block') {
                        const activePaket = section.querySelector('.layanan-btn.active');
                        if (activePaket) {
                            paketTerpilih.push(activePaket.textContent.trim());
                        }
                    }
                });
            });

            const tgl = document.getElementById('date-input') ? document.getElementById('date-input').value : '';
            const wkt = document.getElementById('time-input') ? document.getElementById('time-input').value : '';

            localStorage.setItem('layanan', layananTerpilih.length > 0 ? layananTerpilih.join(', ') : 'Belum Dipilih');
            localStorage.setItem('paket', paketTerpilih.length > 0 ? paketTerpilih.join(', ') : '-');
            localStorage.setItem('jadwal', `${tgl}, ${wkt}`);
        });
    }

    // Read local storage in ringkasan page
    const summaryLayanan = document.getElementById('summary-layanan');
    const summaryPaket = document.getElementById('summary-paket');
    const summaryJadwal = document.getElementById('summary-jadwal');

    if (summaryLayanan && summaryPaket && summaryJadwal) {
        summaryLayanan.textContent = localStorage.getItem('layanan') || 'Belum Dipilih';
        summaryPaket.textContent = localStorage.getItem('paket') || '-';
        summaryJadwal.textContent = localStorage.getItem('jadwal') || '-';
    }
});
