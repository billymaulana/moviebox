export function useToggleMenu() {
  const isShowFullMenu = useState('toggleMenu', () => false)

  function toggleFullMenu() {
    isShowFullMenu.value = !isShowFullMenu.value
  }

  return {
    isShowFullMenu,
    toggleFullMenu,
  }
}
