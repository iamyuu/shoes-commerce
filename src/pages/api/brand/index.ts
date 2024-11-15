import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'A request method is not supported' })
  }

  // use static brand list, to avoid external API calls (subscription required)
  const brands = [
    // '730 FOOTWEAR',
    // 'AMIRI',
    // 'ASICS',
    // 'ALEXANDER MCQUEEN',
    // 'ALEXANDER WANG',
    // 'AND1',
    // 'ANTA',
    // 'BAPE',
    // 'BAIT',
    'BALENCIAGA',
    // 'BALMAIN',
    // 'BIRKENSTOCK',
    // 'BROOKS',
    // 'BURBERRY',
    // 'CELINE',
    // 'CHANEL',
    // 'CHRISTIAN LOUBOUTIN',
    // 'CLARKS',
    // 'COMMON PROJECTS',
    'CONVERSE',
    // 'CROCS',
    // 'DIADORA',
    // 'DIEMME',
    // 'DIOR',
    // 'DR. MARTENS',
    // 'EWING ATHLETICS',
    // 'FEAR OF GOD',
    // 'FENDI',
    // 'FILA',
    // 'GOLDEN GOOSE',
    'GUCCI',
    // 'HOKA ONE ONE',
    'JORDAN',
    // 'KIKO KOSTADINOV',
    // 'LANVIN',
    // 'LI-NING',
    'LOUIS VUITTON',
    // 'MSCHF',
    // 'MAISON MARGIELA',
    // 'MAISON MIHARA YASUHIRO',
    // 'MERRELL',
    // 'MIU MIU',
    // 'MIZUNO',
    // 'NEW BALANCE',
    'NIKE',
    // 'NOTWOWAYS',
    // 'OFF-WHITE',
    // 'ON',
    // 'OAKLEY',
    // 'ONITSUKA TIGER',
    // 'PRADA',
    'PUMA',
    // 'REEBOK',
    // 'REPRESENT',
    // 'RICK OWENS',
    // 'RIGORER',
    // 'SAINT LAURENT',
    // 'SALOMON',
    // 'SAUCONY',
    // 'TELFAR',
    // 'TIMBERLAND',
    // 'UGG',
    // 'UNDER ARMOUR',
    'VANS',
    // 'VEJA',
    // 'VERSACE',
    // 'YEEZY',
    'ADIDAS'
  ]

  // cache for 1 week, but it can be used for an extra 1 day if the server responds with an error
  res.setHeader('Cache-Control', 'public, max-age=604800, stale-if-error=86400')

  return res.status(200).json(brands)
}
