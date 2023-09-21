export const timeAgo = (dateParam: string | Date): string => {
  const date = !dateParam ? new Date('2023-09-20T17:44:55Z') : new Date(dateParam)
  const now = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)

  const secondsPast = (now.getTime() - date.getTime()) / 1000

  if (secondsPast < 60) {
    return `${parseInt(secondsPast.toString())} 초전`
  }

  if (secondsPast < 3600) {
    return `${parseInt((secondsPast / 60).toString())} 분전`
  }

  if (secondsPast <= 86400) {
    return `${parseInt((secondsPast / 3600).toString())} 시간전`
  }

  if (secondsPast > 86400) {
    return `${parseInt((secondsPast / 86400).toString())} 일전`
  }

  return ''
}
