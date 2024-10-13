function loadRoles() {
    fetch('https://raw.githubusercontent.com/L9xPhuc/quantro-masoi/refs/heads/main/roles.json') // Đường dẫn GitHub đến file JSON
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => displayRoles(data))
        .catch(error => console.error('Error loading roles:', error));
}

function displayRoles(data) {
    const roleList = document.getElementById('roleList');
    roleList.innerHTML = ''; // Xóa vai trò trước đó

    for (const faction in data) {
        appendRoleGroup(faction, data[faction]);
    }
}

function appendRoleGroup(faction, roles) {
    const roleList = document.getElementById('roleList');

    // Tạo tiêu đề nhóm vai trò
    const groupItem = document.createElement('li');
    groupItem.textContent = faction;
    groupItem.classList.add('expandable');
    groupItem.onclick = () => {
        const groupDetails = groupItem.nextElementSibling;
        groupDetails.classList.toggle('hidden');
    };
    roleList.appendChild(groupItem);

    // Tạo danh sách vai trò bên trong nhóm
    const groupDetails = document.createElement('ul');
    groupDetails.classList.add('hidden');

    roles.forEach(role => {
        const roleItem = document.createElement('li');
        roleItem.innerHTML = `<strong>${role.name}</strong><br>
                              <em>Nhiệm vụ chính:</em> ${role.main_task}<br>
                              <em>Mô tả:</em> ${role.description}`;
        roleItem.classList.add(faction.toLowerCase().replace(' ', '-')); // Áp dụng màu cho phe
        groupDetails.appendChild(roleItem);
    });

    roleList.appendChild(groupDetails);
}

// Gọi hàm loadRoles khi trang web được tải
window.onload = loadRoles;
