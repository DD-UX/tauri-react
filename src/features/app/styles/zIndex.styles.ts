const Z_INDEX = {
  dropdown: 90,
  sticky: 980,
  fixed: 990,
  modalBackdrop: 1000,
  modal: 1001,
  tooltip: 999, // Default value in Geist is 1000 but technically should never equal or more than the modal's backdrop
  popover: 1001 // This brings popover one layer above side drawer
};

export default Z_INDEX;
