import * as yup from 'yup';

export const ControlSchema = yup.object().shape({
  email: yup
    .string()
    .email('Lütfen geçerli bir eposta adresi giriniz.')
    .required('Eposta alanı zorunludur.'),
  password: yup
    .string()
    .typeError('Her karakteri kullanamazsın. Sadece @/./+/-/_ kullanabilirsin')
    .min(8, 'Şifreniz 8 karakterden az olamaz')
    .max(20, 'Şifreniz 20 karakterden fazla olamaz')
    .required('Şifre alanı zorunludur.'),
});
export const OfferModalSchema = yup.object().shape({
  offer: yup
   .number()
   .required('Teklif verebilmek için bir değer belirlemelisiniz.')
});
export const AddProductSchema = yup.object().shape({
  price: yup
   .number()
   .required('Ürün eklemek için bir fiyat girmelisniz.')
   .typeError('lütfen rakam girin')
});
