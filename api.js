async function fetchDooflixMovies() {
    try {
        // ดึงข้อมูลจากไฟล์ Mock Data ของเราเองในโปรเจกต์
        const response = await fetch('media-data.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("ดึงข้อมูลจากไฟล์ Local สำเร็จ:", data);
        
        // เช็กโครงสร้างข้อมูล (ปรับตามหน้าตา JSON ในไฟล์ media-data.json ของเพื่อน)
        const movieList = data.movie || data;
        
        return movieList.map(item => ({
            id: item.id,
            title: item.title,
            poster: item.image,
            type: item.type || 'movie',
            year: item.year || '2026'
        }));
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", error);
        return [];
    }
}
