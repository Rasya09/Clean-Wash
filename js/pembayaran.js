document.addEventListener('DOMContentLoaded', function () {
    const btnLanjutkan = document.querySelector('.action-section .btn-primary');
    const paymentModal = document.getElementById('payment-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const successModal = document.getElementById('success-modal');
    const btnKonfirmasiOnline = document.getElementById('btn-confirm-online');
    const btnBackHome = document.getElementById('btn-back-home');
    const successMethodText = document.getElementById('success-method');
    const successDescText = document.getElementById('success-desc');

    if (btnLanjutkan && paymentModal && closeModalBtn && successModal) {
        const proofUploadInput = document.getElementById('proof-upload');
        const uploadTextPreview = document.getElementById('upload-text-preview');
        const uploadIconPreview = document.getElementById('upload-icon-preview');

        // Event listener for proceeding from main page
        btnLanjutkan.addEventListener('click', function (e) {
            e.preventDefault();
            
            const selectedMethodRadio = document.querySelector('input[name="payment_method"]:checked');
            
            if (selectedMethodRadio) {
                const selectedMethod = selectedMethodRadio.value;
                
                if (selectedMethod === 'online') {
                    paymentModal.classList.add('active');
                    if (btnKonfirmasiOnline && proofUploadInput) {
                        proofUploadInput.value = '';
                        btnKonfirmasiOnline.disabled = true;
                        
                        if (uploadTextPreview) {
                            uploadTextPreview.innerText = 'Klik untuk unggah atau seret file';
                        }
                        if (uploadIconPreview) {
                            uploadIconPreview.innerText = 'image';
                        }
                    }
                } else {
                    successMethodText.innerText = 'Bayar Nanti (COD)';
                    successDescText.innerText = 'Terima kasih! Pilihan pembayaran COD Anda telah disimpan. Proses pencucian akan segera dimulai.';
                    successModal.classList.add('active');
                }
            }
        });

        // Event listener for proof upload input
        if (proofUploadInput && btnKonfirmasiOnline) {
            proofUploadInput.addEventListener('change', function () {
                if (this.files.length > 0) {
                    btnKonfirmasiOnline.disabled = false;
                    
                    if (uploadTextPreview) {
                        uploadTextPreview.innerText = this.files[0].name;
                    }
                    if (uploadIconPreview) {
                        uploadIconPreview.innerText = 'check_circle';
                    }
                } else {
                    btnKonfirmasiOnline.disabled = true;
                    
                    if (uploadTextPreview) {
                        uploadTextPreview.innerText = 'Klik untuk unggah atau seret file';
                    }
                    if (uploadIconPreview) {
                        uploadIconPreview.innerText = 'image';
                    }
                }
            });
        }

        // Online confirmation button click
        if (btnKonfirmasiOnline) {
            btnKonfirmasiOnline.addEventListener('click', function (e) {
                e.preventDefault();
                
                if (btnKonfirmasiOnline.disabled === true) {
                    return;
                }
                
                paymentModal.classList.remove('active');
                successMethodText.innerText = 'Bayar Sekarang';
                successDescText.innerText = 'Terima kasih! Pembayaran Anda telah berhasil diverifikasi. Proses pencucian akan segera dimulai.';
                successModal.classList.add('active');
            });
        }

        // Return Home
        if (btnBackHome) {
            btnBackHome.addEventListener('click', function (e) {
                e.preventDefault();
                successModal.classList.remove('active');
                window.scrollTo(0, 0);
            });
        }

        // Event listeners to close payment modal
        closeModalBtn.addEventListener('click', function () {
            paymentModal.classList.remove('active');
        });

        // Close modal when clicking outside the modal content container
        window.addEventListener('click', function (e) {
            if (e.target === paymentModal) {
                paymentModal.classList.remove('active');
            }
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }
});