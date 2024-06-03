import 'i18next'
import { resources, defaultNS } from 'src/i18n/i18n'


declare module 'i18next' {
  //Kế thừa  (Thêm vào types)
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS,
    resources: typeof resources['vi']
  }
}