/* ==========================================
   CYBER-WUKONG: ADVANCED AI BRAIN CORE
   ========================================== */

   document.addEventListener('DOMContentLoaded', () => {
    console.log("⚡ [Cyber-AI]: Neural Network & Brain Core Initialized successfully.");

    // 1. ระบบค้นหาอัจฉริยะ (Smart Real-time Search)
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase().trim();
            const cards = document.querySelectorAll('.match-card, .media-card');
            
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(keyword) || keyword === '') {
                    card.style.display = '';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // 2. ระบบจำลองสมองกล AI สตรีมมิ่งความบันเทิง
    const actionButtons = document.querySelectorAll('.btn-play, .media-card, .match-card');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if(this.classList.contains('media-card') || this.classList.contains('match-card') || this.classList.contains('btn-play')) {
                if(this.tagName === 'A' && (this.getAttribute('href') && this.getAttribute('href').includes('.html'))) return;
                console.log("🤖 [Cyber-AI]: Analyzing stream bandwidth and routing optimal server...");
            }
        });
    });

    // 3. ระบบจัดการคำขอสมัครสมาชิก (หน้า register.html)
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('regName').value;
            const phone = document.getElementById('regPhone').value;

            // บันทึกชื่อและเบอร์ชั่วคราวไว้รอผูกกับแพ็กเกจ
            localStorage.setItem('cyber_temp_name', name);
            localStorage.setItem('cyber_temp_phone', phone);

            alert(`🤖 [Cyber-AI]: บันทึกข้อมูลของคุณ "${name}" สำเร็จ! กรุณาเลือกแพ็กเกจสมาชิกต่อได้เลยครับ`);
            window.location.href = 'topup.html';
        });
    }

    // 4. ระบบเลือกแพ็กเกจในหน้า topup.html เพื่อส่งคำขอเข้าแอดมิน
    const topupButtons = document.querySelectorAll('.topup-packages-grid .btn-play, .media-card .btn-play'); 
    if (window.location.pathname.includes('topup.html')) {
        const allPlayBtns = document.querySelectorAll('.btn-play');
        allPlayBtns.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const name = localStorage.getItem('cyber_temp_name') || 'สมาชิกใหม่';
                const phone = localStorage.getItem('cyber_temp_phone') || '08xxxxxxxx';
                
                const packages = ['แพ็กเกจเริ่มต้น 100 บาท', 'แพ็กเกจมหาเทพ VIP 500 บาท', 'แพ็กเกจไซเบอร์อัลติเมท 1,000 บาท'];
                const selectedPkg = packages[index] || 'แพ็กเกจมาตรฐาน';

                let pendingUsers = JSON.parse(localStorage.getItem('cyber_pending_users') || '[]');
                pendingUsers.push({ name, phone, package: selectedPkg });
                localStorage.setItem('cyber_pending_users', JSON.stringify(pendingUsers));

                alert(`🤖 [Cyber-AI]: เลือก "${selectedPkg}" สำเร็จ! ระบบได้ส่งข้อมูลคำขอของคุณไปยังแอดมินเรียบร้อยแล้ว กรุณารอรับรหัสผ่าน`);
                window.location.href = 'login.html';
            });
        });
    }

    // 5. ระบบแอดมินอนุมัติ: ใช้เบอร์โทรเป็นทั้ง Username และ Password (หน้า admin.html)
    const pendingContainer = document.getElementById('pendingListContainer');
    if (pendingContainer) {
        let pendingUsers = JSON.parse(localStorage.getItem('cyber_pending_users') || '[]');
        
        if (pendingUsers.length > 0) {
            pendingContainer.innerHTML = '';
            
            pendingUsers.forEach((user, index) => {
                const card = document.createElement('div');
                card.className = 'media-card';
                card.style.cssText = 'padding: 20px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;';
                card.innerHTML = `
                    <div>
                        <h4 style="color: var(--accent-orange); margin-bottom: 5px;">ชื่อเล่น: ${user.name}</h4>
                        <p style="color: var(--text-muted); font-size: 14px;">เบอร์โทร: ${user.phone} | เลือก: ${user.package || 'แพ็กเกจมาตรฐาน'}</p>
                    </div>
                    <button class="btn-play approve-btn" data-index="${index}" style="padding: 8px 15px; font-size: 13px; cursor: pointer;">กดยืนยันใช้งาน (ใช้เบอร์โทรเป็นรหัส)</button>
                `;
                pendingContainer.appendChild(card);
            });

            const approveButtons = document.querySelectorAll('.approve-btn');
            approveButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.getAttribute('data-index');
                    const approvedUser = pendingUsers[idx];
                    const phoneKey = approvedUser.phone.trim();

                    let db = JSON.parse(localStorage.getItem('cyber_main_db') || '{}');
                    db[phoneKey] = {
                        password: phoneKey, 
                        name: approvedUser.name,
                        activeDeviceToken: null 
                    };
                    localStorage.setItem('cyber_main_db', JSON.stringify(db));

                    pendingUsers.splice(idx, 1);
                    localStorage.setItem('cyber_pending_users', JSON.stringify(pendingUsers));

                    alert(`🤖 [Cyber-AI Admin]: ออนุมัติสำเร็จ!\n- Username: ${phoneKey}\n- Password: ${phoneKey} (ใช้เบอร์โทรเข้าสู่ระบบได้เลย)`);
                    location.reload();
                });
            });
        }
    }

    // 6. ระบบ Login: เช็กเบอร์โทร + ล็อกจำกัด 1 ไอดีต่อ 1 เครื่อง (หน้า login.html)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const phoneInput = document.querySelector('input[type="text"]').value.trim();
            const passwordInput = document.querySelector('input[type="password"]').value.trim();

            let db = JSON.parse(localStorage.getItem('cyber_main_db') || '{}');

            if (db[phoneInput] && db[phoneInput].password === passwordInput) {
                let currentDeviceId = localStorage.getItem('cyber_device_id');
                if (!currentDeviceId) {
                    currentDeviceId = 'device_' + Math.random().toString(36).substring(2, 15);
                    localStorage.setItem('cyber_device_id', currentDeviceId);
                }

                if (db[phoneInput].activeDeviceToken && db[phoneInput].activeDeviceToken !== currentDeviceId) {
                    alert('❌ [Cyber-AI Security]: บัญชีนี้กำลังใช้งานอยู่บนอุปกรณ์อื่นแล้ว! อนุญาตให้ใช้งาน 1 ผู้ใช้งานต่อ 1 เครื่องเท่านั้น');
                    return;
                }

                db[phoneInput].activeDeviceToken = currentDeviceId;
                localStorage.setItem('cyber_main_db', JSON.stringify(db));

                alert(`🤖 [Cyber-AI]: ยินดีต้อนรับคุณ ${db[phoneInput].name} เข้าสู่ระบบด้วยเบอร์โทร ${phoneInput} สำเร็จ!`);
                localStorage.setItem('cyber_logged_in', 'true');
                localStorage.setItem('cyber_current_user', phoneInput);
                
                window.location.href = 'index.html';
            } else {
                alert('❌ [Cyber-AI Error]: เบอร์โทรหรือรหัสผ่านไม่ถูกต้อง! กรุณาตรวจสอบใหม่อีกครั้ง');
            }
        });
    }
});
    // 7. ระบบออกจากระบบ (Logout System)
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const currentUser = localStorage.getItem('cyber_current_user');
            
            if (currentUser) {
                // ดึงฐานข้อมูลหลักมาเคลียร์ค่า activeDeviceToken ของเบอร์นี้ออก
                let db = JSON.parse(localStorage.getItem('cyber_main_db') || '{}');
                if (db[currentUser]) {
                    db[currentUser].activeDeviceToken = null; // ปลดล็อกเครื่อง เพื่อให้อุปกรณ์อื่นล็อกอินได้
                    localStorage.setItem('cyber_main_db', JSON.stringify(db));
                }
            }

            // ล้างสถานะการเข้าสู่ระบบปัจจุบัน
            localStorage.removeItem('cyber_logged_in');
            localStorage.removeItem('cyber_current_user');
            // หมายเหตุ: เรายังเก็บ cyber_device_id ไว้ หรือจะเคลียร์ด้วยก็ได้ตามความเหมาะสม

            alert('🤖 [Cyber-AI Security]: ออกจากระบบสำเร็จ! อุปกรณ์ถูกปลดล็อกเรียบร้อยแล้ว');
            
            // พาพุ่งกลับไปหน้า Login
            window.location.href = 'login.html';
        });
    }
            // 8. ระบบจัดการลิงก์ถ่ายทอดสดฟุตบอล (Global Event Delegation - รองรับทุกหน้า)
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.match-card, .media-card');
        if (card) {
            // ดึงลิงก์จาก data-stream ถ้าไม่มี ให้ใช้ลิงก์สำรอง TrueID ทันที
            let streamUrl = card.getAttribute('data-stream');
            if (!streamUrl || streamUrl === '#') {
                streamUrl = 'https://tv.trueid.net/th-en/live/one-hd'; 
            }

            const titleElement = card.querySelector('h4') || card.querySelector('span');
            const matchTitle = titleElement ? titleElement.textContent : 'การแข่งขันสด';

            console.log(`🤖 [Cyber-AI Live]: Connecting to broadcast stream for "${matchTitle}"...`);
            alert(`🤖 [Cyber-AI]: กำลังเชื่อมต่อสัญญาณสดคู่ "${matchTitle}" ไปยังห้องสตรีมมิ่งความละเอียดสูง...`);
            
            // เปิดลิงก์สตรีมในแท็บใหม่
            window.open(streamUrl, '_blank');
        }
    });

    

