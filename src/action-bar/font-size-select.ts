const fontSizeSelector = document.getElementById('font-size-selector') !;

const sizeOptions = [
    8,
    9,
    10,
    11,
    12,
    14,
    16,
    18,
    20,
    22,
    24,
    26,
    28,
    36
]

const selectOptions = fontSizeSelector.getElementsByClassName('select-options')[0];

for(const option of sizeOptions) {

    const val = option + "pt";

    const li = document.createElement('li');
    li.setAttribute('value', val );
    li.innerText = val;
    selectOptions.appendChild(li);
}