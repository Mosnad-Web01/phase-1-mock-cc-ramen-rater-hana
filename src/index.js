document.addEventListener('DOMContentLoaded', () => {
    const ramenMenu = document.getElementById('ramen-menu');
    const ramenDetail = document.getElementById('ramen-detail');
    const newRamenForm = document.getElementById('new-ramen');

    // دالة لجلب بيانات الرامن من السيرفر وعرضها في القائمة
    async function fetchAndDisplayRamens() {
        try {
            const response = await fetch('http://localhost:3000/ramens');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const ramens = await response.json();
            
            ramens.forEach(ramen => {
                displayRamenImage(ramen);
            });
        } catch (error) {
            console.log('Error:', error);
        }
    }
    // دالة لعرض صورة الرامن في القائمة
    function displayRamenImage(ramen) {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener('click', () => displayRamenDetails(ramen));
        ramenMenu.appendChild(img);
    }

    // دالة لعرض تفاصيل الرامن في قسم التفاصيل
    function displayRamenDetails(ramen) {
        ramenDetail.querySelector('img').src = ramen.image;
        ramenDetail.querySelector('h2').textContent = ramen.name;
        ramenDetail.querySelector('h3').textContent = ramen.restaurant;
        ramenDetail.querySelector('#rating-display').textContent = ramen.rating;
        ramenDetail.querySelector('#comment-display').textContent = ramen.comment;
    }

    // دالة لمعالجة إضافة رامن جديد
    newRamenForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newRamen = {
            name: event.target['new-name'].value,
            restaurant: event.target['new-restaurant'].value,
            image: event.target['new-image'].value,
            rating: event.target['new-rating'].value,
            comment: event.target['new-comment'].value,
        };

        // عرض الرامن الجديد في القائمة
        displayRamenImage(newRamen);

        // إعادة تعيين الحقول في النموذج
        newRamenForm.reset();
    });

    // استدعاء الدالة لجلب وعرض بيانات الرامن عند تحميل الصفحة
    fetchAndDisplayRamens();
});
// write your code here 
