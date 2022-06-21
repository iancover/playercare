function NoteItem({ note: { _id, text, createdAt, isStaff } }) {
  return (
    <li
      className='rounded'
      style={{ backgroundColor: isStaff ? 'var(--dark-4)' : 'var(--dark-1)' }}>
      <div className='bg-dark-3 pr-5 rounded'>
        <p
          className='text-orange pt-2 pb-6 px-2 mb-2 rounded'
          style={{
            color: isStaff ? 'var(--dark-2)' : 'var(--orange)',
            backgroundColor: isStaff ? 'var(--grey-3)' : 'var(--dark-1)',
          }}>
          <span
            className='ml-1 mr-2'
            style={{
              color: isStaff ? 'var(--dark-1)' : 'var(--muted-blue)',
            }}>
            {new Date(createdAt).toLocaleString('en-US')}
          </span>
          <span
            className='ml-1 mr-2'
            style={{
              color: isStaff && 'var(--blue)',
            }}>
            {isStaff && 'support team: '}
          </span>
          {text}
        </p>
      </div>
    </li>
  );
}

export default NoteItem;
