// function CreateCrudButtons() {
//     let del = document.createElement('a');
//     del.classList.add('btn', 'btn-danger');
//     del.setAttribute('value', bicycle.bicycleId);
//     del.innerText = 'Delete';
//     del.addEventListener('click', function(e) {
//         let value = e.target.getAttribute('value');
//         var row = document.getElementById(value);
//         document.querySelector('tbody').removeChild(row);

//         fetch('/Api/Bicycle/' + value, { method: 'DELETE' });
//     });
//     tr.append(del)

//     let edit = document.createElement('a');
//     edit.classList.add('btn', 'btn-info');
//     edit.setAttribute('value', bicycle.bicycleId);
//     edit.innerText = 'Edit';
//     edit.addEventListener('click', function(e) {
//         let value = e.target.getAttribute('value');
//         let bicycle = bicycles.find(b => b.bicycleId == value)

//         form.elements['bicycleTitle'].value = bicycle.bicycleTitle

//         form.elements['bicycleImage'].value = bicycle.bicycleImage

//         form.elements['bicycleWeight'].value = bicycle.bicycleWeight
//         form.elements['bicycleMaterial'].value = bicycle.bicycleMaterial
//         form.elements['bicycleColor'].value = bicycle.bicycleColor
//         form.elements['bicycleWheelDiameter'].value = bicycle.bicycleWheelDiameter
//         form.elements['bicycleAdditionalInfo'].value = bicycle.bicycleAdditionalInfo
//         form.elements['bicyclePrice'].value = bicycle.bicyclePrice

//         id = document.getElementById('bicycleId')
//         id.value = bicycle.bicycleId
//     });
//     tr.append(edit)
// }