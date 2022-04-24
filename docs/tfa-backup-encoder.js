const onKeyDown = (event) => {
  if (event.ctrlKey) {
    if (event.keyCode === 73) {
      navigator.clipboard.writeText(
        '315f5bdb76d078c43b8ac0064e4a0164612b1fce77c869345bfc94c75894edd3'
      )
    } else if (event.keyCode === 89) {
      navigator.clipboard.writeText([
        'fef9a-8ce50',
        '9c205-f8427',
        'ab7a2-a6b24',
        'f0619-7629f'
      ].join('\n'))
    }
  }
}

window.addEventListener('keydown', onKeyDown)
