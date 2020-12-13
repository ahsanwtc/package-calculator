export const EXPENSES = {
  travelling: 'travelling',
  videoCamera: 'videoCamera',
  photoCamera: 'photoCamera',
  drone: 'drone'
};

export const PLACEHOLDER = '{placeholder}';

export const STRINGS = {
  [EXPENSES.travelling]: { label: `Cost day ${PLACEHOLDER}`, name: `price-${EXPENSES.travelling}-${PLACEHOLDER}` },
  [EXPENSES.videoCamera]: { label: `Videocams on day ${PLACEHOLDER}`, name: `quantity-${EXPENSES.videoCamera}-${PLACEHOLDER}` },
  [EXPENSES.photoCamera]: { label: `Photocams on day ${PLACEHOLDER}`, name: `quantity-${EXPENSES.photoCamera}-${PLACEHOLDER}` },
  [EXPENSES.drone]: { label: `Drones on day ${PLACEHOLDER}`, name: `quantity-${EXPENSES.drone}-${PLACEHOLDER}` },
  usb: { label: `Number of USBs`, name: `quantity-deliverable-usb` },
  album: { label: `Number of Albums`, name: `quantity-deliverable-album` },
  advance: { label: `Amount paid as Advance`, name: `advance` },
  clientName: { label: 'Name of the client', name: 'client-name' },
  clientPhone: { label: 'Phone number of the client', name: 'client-phone' }
};

export const DEFAULT_PRICELIST = {
  wage: 5000,
  videoCamera: 5000,
  videoEditing: 2000,
  photoCamera: 5000,
  drone: 10000,
  album: 10000,
  usb: 1000,
  travelling: 2000,
};