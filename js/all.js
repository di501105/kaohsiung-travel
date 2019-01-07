//json資料
var xhr = new XMLHttpRequest();
xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true);
xhr.send(null);
xhr.onload = function() {
    if(xhr.status == 200){

        const data = JSON.parse(xhr.responseText);
        // console.log(data);
        //MOD
        const select = document.querySelector('.select');
        const nav = document.querySelector('nav');
        const title = document.querySelector('.title');
        const area = document.querySelector('.area');

        // 下拉選單
        const zoneList = [];
        for (let i = 0; i < data.result.records.length; i++) {
            zoneList.push(data.result.records[i].Zone);
        }
        //判斷是否重複
        const zone = [];
        zoneList.forEach(function(value){
            if(zone.indexOf(value) == -1){
                zone.push(value);
            }
        });
        for (let i = 0; i < zone.length; i++) {
            const str = document.createElement('option');
            str.textContent = zone[i];
            select.appendChild(str);
        }

        // 內容更新
        function update(e) {
            //console.log(e.target.value);
            const selectValue = e.target.value;
            let zoneStr = '';
            let areaStr = '';
            for (let i = 0; i < data.result.records.length; i++) {
                if (selectValue == data.result.records[i].Zone) {
                    zoneStr = data.result.records[i].Zone;
                    areaStr += `<li>
                                    <img src = "${data.result.records[i].Picture1}" alt = "${data.result.records[i].Name}" >
                                    <h3 class="name">${data.result.records[i].Name}</h3>
                                    <h4 class="zone">${data.result.records[i].Zone}</h4>
                                    <div class="text">
                                        <p class="time">${data.result.records[i].Opentime}</p>
                                        <p class="address">${data.result.records[i].Add}</p>
                                        <p class="tel">${data.result.records[i].Tel}</p>
                                        <p class="ticketinfo">${data.result.records[i].Ticketinfo}</p>
                                    </div>
                                </li>`;
                }   
            }
            title.innerHTML = zoneStr;
            area.innerHTML = areaStr;
        }
        
        
        select.addEventListener('change', update, false);
        nav.addEventListener('click', update, false);


        
    }else{
        alert('無法連接資料庫');
    }
}

