(function() {
  let tree = null;
  let parentId = null;
  let idCounter = 0;

  function generateId() {
    idCounter += 1;
    return 'node-' + idCounter;
  }

  function findNode(node, id) {
    if (!node) return null;
    if (node.id === id) return node;
    for (const child of node.children) {
      const found = findNode(child, id);
      if (found) return found;
    }
    return null;
  }

  function renderNode(node) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = node.name;
    span.className = 'node';
    span.onclick = () => showInfo(node);
    li.appendChild(span);

    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add Child';
    addBtn.onclick = () => openForm(node.id);
    li.appendChild(addBtn);

    if (node.children.length > 0) {
      const ul = document.createElement('ul');
      for (const child of node.children) {
        ul.appendChild(renderNode(child));
      }
      li.appendChild(ul);
    }
    return li;
  }

  function renderTree() {
    const treeEl = document.getElementById('tree');
    treeEl.innerHTML = '';
    if (tree) {
      treeEl.appendChild(renderNode(tree));
    }
  }

  function showInfo(node) {
    const info = document.getElementById('info');
    info.textContent = JSON.stringify({name: node.name, mesh: node.mesh}, null, 2);
  }

  function openForm(pid) {
    parentId = pid;
    document.getElementById('node-name').value = '';
    document.getElementById('node-mesh').value = '';
    document.getElementById('node-form').classList.remove('hidden');
  }

  function closeForm() {
    document.getElementById('node-form').classList.add('hidden');
  }

  document.getElementById('add-root').addEventListener('click', () => {
    openForm(null);
  });

  document.getElementById('cancel-node').addEventListener('click', () => {
    closeForm();
  });

  document.getElementById('save-node').addEventListener('click', () => {
    const name = document.getElementById('node-name').value.trim();
    const mesh = document.getElementById('node-mesh').value.trim();
    if (!name) {
      alert('Name required');
      return;
    }
    const newNode = { id: generateId(), name, mesh, children: [] };
    if (!tree) {
      tree = newNode;
    } else {
      const parent = findNode(tree, parentId);
      if (parent) {
        parent.children.push(newNode);
      }
    }
    closeForm();
    renderTree();
  });

})();
