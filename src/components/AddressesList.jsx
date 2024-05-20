import {
  findAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from "@/fetch/address";
import { findCities, findCity } from "@/fetch/city";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddressesList() {
  const router = useRouter();
  const [isFormVisible, setFormVisible] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const [cityName, setCityName] = useState("");
  const [cities, setCities] = useState([]);
  const [title, setTitle] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [streetAddress, setStreetAddress] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cityId, setCityId] = useState("");
  const [index, setIndex] = useState("");
  const [errorAdd, setErrorAdd] = useState(false);
  const [errorEdit, setErrorEdit] = useState(false);
  const [errorDelete, setErrorDelete] = useState(false);
  const [successAdd, setSuccessAdd] = useState(false);
  const [successEdit, setSuccessEdit] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);

  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  const toggleEditForm = (index) => {
    const address = addresses[index];
    setTitle(address.title);
    setStreetAddress(address.street_address);
    setCityId(address.city_id);
    setProvince(address.province);
    setPostalCode(address.postal_code);
    setEditIndex(index);
    setEditVisible(!isEditVisible);
    setIndex(address.id);
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    try {
      await updateAddress(index, {
        title: title,
        street_address: streetAddress,
        city_id: +cityId,
        province: province,
        postal_code: +postalCode,
      });
      setSuccessEdit(true);
      setTimeout(() => setSuccessEdit(false), 3000);
      router.refresh();
    } catch (err) {
      setErrorEdit(true);
      setTimeout(() => setErrorEdit(false), 3000);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await deleteAddress(addressId);
      setSuccessDelete(true);
      setTimeout(() => setSuccessDelete(false), 3000);
      router.refresh();
    } catch (err) {
      setErrorDelete(true);
      setTimeout(() => setErrorDelete(false), 3000);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      await createAddress({
        title: title,
        street_address: streetAddress,
        city_id: +cityId,
        province: province,
        postal_code: +postalCode,
      });
      setSuccessAdd(true);
      setTimeout(() => setSuccessAdd(false), 3000);
      router.refresh();
    } catch (error) {
      setErrorAdd(true);
      setTimeout(() => setErrorAdd(false), 3000);
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      const citiesData = await findCities();
      setCities(citiesData);
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const fetchAddresses = async () => {
      const addressesData = await findAddresses();
      setAddresses(addressesData);
    };

    fetchAddresses();
  }, []);

  useEffect(() => {
    const fetchCity = async () => {
      let cityNames = [];
      for (let address of addresses) {
        let cityName = "";
        if (address.city_id) {
          try {
            const cityData = await findCity(address.city_id);
            cityName = cityData && cityData.name ? cityData.name : "";
          } catch (error) {
            console.error("Error fetching city:", error);
          }
        }
        cityNames.push(cityName);
      }
      setCityName(cityNames);
    };

    fetchCity();
  }, [addresses]);

  return (
    <div>
      <div>
        <div className="flex justify-center pt-10">
          <button
            type="button"
            onClick={toggleForm}
            className="text-white btn bg-[#3797db] hover:bg-[#3187c5] mb-3"
          >
            Add New Address
          </button>
        </div>
        <div>
          <div className="flex justify-center">
            {errorAdd && (
              <div
                role="alert"
                className="text-white alert alert-error w-2/5 flex justify-center mb-5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Failed to Add New Address!</span>
              </div>
            )}

            {successAdd && (
              <div
                role="alert"
                className="text-white alert alert-success w-2/5 flex justify-center mb-5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Success to Add New Address!</span>
              </div>
            )}
          </div>

          {isFormVisible && (
            <form onSubmit={handleAddAddress} className="flex flex-col">
              <label className="flex justify-center">
                <input
                  className="w-2/5 border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm mb-3"
                  name="Title"
                  type="text"
                  placeholder="Address Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  minLength="3"
                  required
                />
              </label>

              <label className="flex justify-center">
                <input
                  className="w-2/5  border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm mb-3"
                  name="Street Address"
                  type="text"
                  placeholder="Street Address"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  minLength="3"
                  required
                />
              </label>

              <label className="flex justify-center">
                <select
                  className="w-2/5 select select-bordered border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm mb-3"
                  name="City Name"
                  onChange={(e) => setCityId(e.target.value)}
                  required
                >
                  <option>Select Your City</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex justify-center">
                <select
                  className="w-2/5 select select-bordered border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm mb-3"
                  name="Province Name"
                  onChange={(e) => setProvince(e.target.value)}
                  value={province}
                  required
                >
                  <option>Select Your Province</option>
                  <option value="Bali">Bali</option>
                  <option value="Bangka Belitung">Bangka Belitung</option>
                  <option value="Banten">Banten</option>
                  <option value="Bengkulu">Bengkulu</option>
                  <option value="DI Yogyakarta">DI Yogyakarta</option>
                  <option value="DKI Jakarta">DKI Jakarta</option>
                  <option value="Gorontalo">Gorontalo</option>
                  <option value="Jambi">Jambi</option>
                  <option value="Jawa Barat">Jawa Barat</option>
                  <option value="Jawa Tengah">Jawa Tengah</option>
                  <option value="Jawa Timur">Jawa Timur</option>
                  <option value="Kalimantan Barat">Kalimantan Barat</option>
                  <option value="Kalimantan Selatan">Kalimantan Selatan</option>
                  <option value="Kalimantan Tengah">Kalimantan Tengah</option>
                  <option value="Kalimantan Timur">Kalimantan Timur</option>
                  <option value="Kalimantan Utara">Kalimantan Utara</option>
                  <option value="Kepulauan Riau">Kepulauan Riau</option>
                  <option value="Lampung">Lampung</option>
                  <option value="Maluku">Maluku</option>
                  <option value="Maluku Utara">Maluku Utara</option>
                  <option value="Nanggroe Aceh Darussalam (NAD)">
                    Nanggroe Aceh Darussalam (NAD)
                  </option>
                  <option value="Nusa Tenggara Barat (NTB)">
                    Nusa Tenggara Barat (NTB)
                  </option>
                  <option value="Nusa Tenggara Timur (NTT)">
                    Nusa Tenggara Timur (NTT)
                  </option>
                  <option value="Papua">Papua</option>
                  <option value="Papua Barat">Papua Barat</option>
                  <option value="Riau">Riau</option>
                  <option value="Sulawesi Barat">Sulawesi Barat</option>
                  <option value="Sulawesi Selatan">Sulawesi Selatan</option>
                  <option value="Sulawesi Tengah">Sulawesi Tengah</option>
                  <option value="Sulawesi Tenggara">Sulawesi Tenggara</option>
                  <option value="Sulawesi Utara">Sulawesi Utara</option>
                  <option value="Sumatera Barat">Sumatera Barat</option>
                  <option value="Sumatera Selatan">Sumatera Selatan</option>
                  <option value="Sumatera Utara">Sumatera Utara</option>
                </select>
              </label>

              <label className="flex justify-center">
                <input
                  className="w-2/5  border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm mb-3"
                  name="Postal Code"
                  type="number"
                  placeholder="Enter Your Postal Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  minLength="3"
                  required
                />
              </label>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="text-white w-1/5 btn btn-success mr-5"
                >
                  Add New Address
                </button>
                <button
                  onClick={toggleForm}
                  className="text-white w-1/5 btn btn-error"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        {errorDelete && (
          <div
            role="alert"
            className="text-white alert alert-error w-2/5 flex justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Failed to Delete Address!</span>
          </div>
        )}

        {successDelete && (
          <div
            role="alert"
            className="text-white alert alert-success w-2/5 flex justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Success to Delete Address!</span>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center pt-5">
        {addresses
          .sort((a, b) => a.id - b.id)
          .map((address, index) => (
            <div className="text-center pb-10" key={index}>
              <p className="text-xl font-semibold">{address.title}</p>
              <p>{address.street_address}</p>
              <p>{cityName[index]}</p>
              <p>{address.province}</p>
              <p>{address.postal_code}</p>
              <button
                className="w-24 text-white btn btn-success mr-5 mt-3"
                onClick={() => toggleEditForm(index)}
              >
                Edit
              </button>
              <button
                className="w-24 text-white btn btn-error"
                onClick={() => handleDeleteAddress(address.id)}
              >
                Delete
              </button>

              <div>
                {isEditVisible && editIndex === index && (
                  <form
                    onSubmit={handleUpdateAddress}
                    className="flex flex-col mt-3"
                  >
                    <div>
                      <label className="flex justify-center">
                        <input
                          className="w-2/5  border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm mb-3"
                          name="Title"
                          type="text"
                          placeholder="Address Title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          minLength="3"
                          required
                        />
                      </label>

                      <label className="flex justify-center">
                        <input
                          className="w-2/5  border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm mb-3"
                          name="Street Address"
                          type="text"
                          placeholder="Street Address"
                          value={streetAddress}
                          onChange={(e) => setStreetAddress(e.target.value)}
                          minLength="3"
                          required
                        />
                      </label>

                      <label className="flex justify-center">
                        <select
                          className="w-2/5 select select-bordered border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm mb-3"
                          name="City Name"
                          onChange={(e) => setCityId(e.target.value)}
                          required
                        >
                          <option>Select Your City</option>
                          {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="flex justify-center">
                        <select
                          className="w-2/5 select select-bordered border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm mb-3"
                          name="Province Name"
                          onChange={(e) => setProvince(e.target.value)}
                          value={province}
                          required
                        >
                          <option>Select Your Province</option>
                          <option value="Bali">Bali</option>
                          <option value="Bangka Belitung">
                            Bangka Belitung
                          </option>
                          <option value="Banten">Banten</option>
                          <option value="Bengkulu">Bengkulu</option>
                          <option value="DI Yogyakarta">DI Yogyakarta</option>
                          <option value="DKI Jakarta">DKI Jakarta</option>
                          <option value="Gorontalo">Gorontalo</option>
                          <option value="Jambi">Jambi</option>
                          <option value="Jawa Barat">Jawa Barat</option>
                          <option value="Jawa Tengah">Jawa Tengah</option>
                          <option value="Jawa Timur">Jawa Timur</option>
                          <option value="Kalimantan Barat">
                            Kalimantan Barat
                          </option>
                          <option value="Kalimantan Selatan">
                            Kalimantan Selatan
                          </option>
                          <option value="Kalimantan Tengah">
                            Kalimantan Tengah
                          </option>
                          <option value="Kalimantan Timur">
                            Kalimantan Timur
                          </option>
                          <option value="Kalimantan Utara">
                            Kalimantan Utara
                          </option>
                          <option value="Kepulauan Riau">Kepulauan Riau</option>
                          <option value="Lampung">Lampung</option>
                          <option value="Maluku">Maluku</option>
                          <option value="Maluku Utara">Maluku Utara</option>
                          <option value="Nanggroe Aceh Darussalam (NAD)">
                            Nanggroe Aceh Darussalam (NAD)
                          </option>
                          <option value="Nusa Tenggara Barat (NTB)">
                            Nusa Tenggara Barat (NTB)
                          </option>
                          <option value="Nusa Tenggara Timur (NTT)">
                            Nusa Tenggara Timur (NTT)
                          </option>
                          <option value="Papua">Papua</option>
                          <option value="Papua Barat">Papua Barat</option>
                          <option value="Riau">Riau</option>
                          <option value="Sulawesi Barat">Sulawesi Barat</option>
                          <option value="Sulawesi Selatan">
                            Sulawesi Selatan
                          </option>
                          <option value="Sulawesi Tengah">
                            Sulawesi Tengah
                          </option>
                          <option value="Sulawesi Tenggara">
                            Sulawesi Tenggara
                          </option>
                          <option value="Sulawesi Utara">Sulawesi Utara</option>
                          <option value="Sumatera Barat">Sumatera Barat</option>
                          <option value="Sumatera Selatan">
                            Sumatera Selatan
                          </option>
                          <option value="Sumatera Utara">Sumatera Utara</option>
                        </select>
                      </label>

                      <label className="flex justify-center">
                        <input
                          className="w-2/5  border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm mb-3"
                          name="Postal Code"
                          type="number"
                          placeholder="Enter Your Postal Code"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          minLength="3"
                          required
                        />
                      </label>
                      <div className="flex justify-center">
                        {errorEdit && (
                          <div
                            role="alert"
                            className="text-white alert alert-error w-2/5 flex justify-center mb-5"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="stroke-current shrink-0 h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span>Failed to Edit Address!</span>
                          </div>
                        )}

                        {successEdit && (
                          <div
                            role="alert"
                            className="text-white alert alert-success w-2/5 flex justify-center mb-5"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="stroke-current shrink-0 h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span>Success to Edit Address!</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="text-white w-1/5 btn btn-success mr-5"
                      >
                        Confirm Edit Address
                      </button>

                      <button
                        onClick={toggleEditForm}
                        className="text-white w-1/5 btn btn-error"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
