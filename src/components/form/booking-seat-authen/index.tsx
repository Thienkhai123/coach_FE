import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SelectOptionSearch from "@/components/input/select-option-search";
import { useState } from "react";
import DatePicker from "react-datepicker";

interface IFormValues {
  from?: string;
  to?: string;
}

const FormBookingSeatAuthen = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const schema = yup.object().shape({});

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
    formState: { errors, isValid },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      from: "",
      to: "",
    },
  });

  const watchFrom = watch("from");

  const onSubmit = async (data: IFormValues) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-5 border rounded-xl flex flex-col gap-2"
    >
      <p>Form đã đăng nhập</p>
      {/* <SelectOptionSearch
        listOpt={[]}
        name="from"
        register={register}
        setValue={setValue}
        placeHolder="Chọn điểm đi"
        value={watchFrom || ""}
      />

      <SelectOptionSearch
        listOpt={[]}
        name="to"
        register={register}
        setValue={setValue}
        placeHolder="Chọn điểm đến"
        value={watchFrom || ""}
      />

      <div className="w-fit">
        <DatePicker
          selected={startDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setStartDate(date)}
        />
      </div>

      */}
    </form>
  );
};

export default FormBookingSeatAuthen;
