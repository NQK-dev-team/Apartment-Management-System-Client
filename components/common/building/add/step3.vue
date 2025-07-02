<template>
  <div class="flex overflow-auto w-full h-full pt-5">
    <div id="add_building_step_3_left_side" class="flex-1 h-full flex flex-col me-10">
      <div class="flex">
        <div class="flex-1">
          <label for="building_name_3" class="flex mb-1">
            <span>{{ $t('building_name') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input
            id="building_name_3"
            :placeholder="$t('enter_building_name')"
            :value="buildingInfo.name"
            disabled
            readonly
          />
        </div>
        <div class="flex-1 ms-5">
          <label for="building_address_3" class="flex mb-1">
            <span>{{ $t('building_address') }}</span>
            <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
          </label>
          <a-input
            id="building_address_3"
            :value="buildingInfo.address"
            :placeholder="$t('enter_building_address')"
            disabled
            readonly
          />
        </div>
      </div>
      <div class="mt-10">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">{{ $t('service_list') }}</h2>
        </div>
        <div class="mt-3 mb-2">
          <table class="w-full">
            <thead
              class="border-b-[1px]"
              :class="[lightMode ? 'bg-[#FAFAFA] border-[#8080801a]' : 'bg-[#323232] border-[#80808040]']"
            >
              <tr>
                <th class="text-sm font-normal text-center align-middle py-[16px] w-[75px]">
                  <div
                    class="border-r-[1px] h-[20px]"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    {{ $t('no') }}
                  </div>
                </th>
                <th class="text-sm font-normal text-center align-middle py-[16px]">
                  <div
                    class="border-r-[1px] h-[20px] flex items-center justify-center"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    {{ $t('service_name') }}
                    <div class="flex items-center">
                      <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
                    </div>
                  </div>
                </th>
                <th class="text-sm font-normal text-center align-middle py-[16px]">
                  <div
                    class="border-r-[1px] h-[20px] flex items-center justify-center"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    {{ $t('service_price') }}
                    <div class="flex items-center">
                      <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody v-if="buildingInfo.services.length">
              <CommonBuildingAddServiceItem
                v-for="(service, index) in buildingInfo.services"
                :key="index"
                :index="index"
                :service="service"
                :read-only="true"
              />
            </tbody>
            <tbody v-else>
              <tr class="h-[150px]">
                <td
                  :colspan="100"
                  class="border-b-[1px]"
                  :class="[lightMode ? 'border-[#f0f0f0]' : 'border-[#303030]']"
                >
                  <div class="h-full w-full">
                    <div
                      class="flex flex-col items-center justify-center overflow-hidden"
                      :style="{ width: `${pageContentWidth - 2}px` }"
                    >
                      <svg
                        v-if="lightMode"
                        width="64"
                        height="41"
                        viewBox="0 0 64 41"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                          <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                          <g fill-rule="nonzero" stroke="#d9d9d9">
                            <path
                              d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                            ></path>
                            <path
                              d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                              fill="#fafafa"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      <svg v-else width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                          <ellipse fill="#272727" cx="32" cy="33" rx="32" ry="7"></ellipse>
                          <g fill-rule="nonzero" stroke="#3e3e3e">
                            <path
                              d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                            ></path>
                            <path
                              d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                              fill="#1d1d1d"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      <p class="mt-[8px]" :class="[lightMode ? 'text-[#00000040]' : 'text-[#ffffff40]']">
                        {{ $t('no_data') }}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>{{ $t('total') }}: {{ buildingInfo.services.length }}</p>
      </div>
      <div class="mt-10">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">{{ $t('management_schedule') }}</h2>
        </div>
        <div class="mt-3 mb-2">
          <table class="w-full">
            <thead
              class="border-b-[1px]"
              :class="[lightMode ? 'bg-[#FAFAFA] border-[#8080801a]' : 'bg-[#323232] border-[#80808040]']"
            >
              <tr>
                <th class="text-sm font-normal text-center align-middle py-[16px]">
                  <div
                    class="border-r-[1px] h-[20px]"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    {{ $t('no') }}
                  </div>
                </th>
                <th class="text-sm font-normal text-center align-middle py-[16px]">
                  <div
                    class="border-r-[1px] h-[20px] flex items-center justify-center"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    {{ $t('employee') }}
                    <div class="flex items-center">
                      <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
                    </div>
                  </div>
                </th>
                <th class="text-sm font-normal text-center align-middle py-[16px]">
                  <div
                    class="border-r-[1px] h-[20px]"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    {{ $t('email') }}
                  </div>
                </th>
                <th class="text-sm font-normal text-center align-middle py-[16px]">
                  <div
                    class="border-r-[1px] h-[20px]"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    {{ $t('phone') }}
                  </div>
                </th>
                <th class="text-sm font-normal text-center align-middle py-[16px]">
                  <div
                    class="border-r-[1px] h-[20px] flex items-center justify-center"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    {{ $t('startDate') }}
                    <div class="flex items-center">
                      <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
                    </div>
                  </div>
                </th>
                <th class="text-sm font-normal text-center align-middle py-[16px]">
                  <div
                    class="border-r-[1px] h-[20px] flex items-center justify-center"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    {{ $t('endDate') }}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody v-if="buildingInfo.schedules.length">
              <CommonBuildingAddScheduleItem
                v-for="(schedule, index) in buildingInfo.schedules"
                :key="index"
                :index="index"
                :schedule="schedule"
                :read-only="true"
                :managers="props.managers"
              />
            </tbody>
            <tbody v-else>
              <tr class="h-[150px]">
                <td
                  :colspan="100"
                  class="border-b-[1px]"
                  :class="[lightMode ? 'border-[#f0f0f0]' : 'border-[#303030]']"
                >
                  <div class="h-full w-full">
                    <div
                      class="flex flex-col items-center justify-center overflow-hidden"
                      :style="{ width: `${pageContentWidth - 2}px` }"
                    >
                      <svg
                        v-if="lightMode"
                        width="64"
                        height="41"
                        viewBox="0 0 64 41"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                          <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                          <g fill-rule="nonzero" stroke="#d9d9d9">
                            <path
                              d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                            ></path>
                            <path
                              d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                              fill="#fafafa"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      <svg v-else width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                          <ellipse fill="#272727" cx="32" cy="33" rx="32" ry="7"></ellipse>
                          <g fill-rule="nonzero" stroke="#3e3e3e">
                            <path
                              d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                            ></path>
                            <path
                              d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                              fill="#1d1d1d"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      <p class="mt-[8px]" :class="[lightMode ? 'text-[#00000040]' : 'text-[#ffffff40]']">
                        {{ $t('no_data') }}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>{{ $t('total') }}: {{ buildingInfo.schedules.length }}</p>
      </div>
      <div class="mt-10">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">{{ $t('floor_list') }}</h2>
        </div>
        <div class="mt-3 mb-2">
          <table class="w-full">
            <thead
              class="border-b-[1px]"
              :class="[lightMode ? 'bg-[#FAFAFA] border-[#8080801a]' : 'bg-[#323232] border-[#80808040]']"
            >
              <tr>
                <th class="text-sm font-normal text-center align-middle py-[16px]">
                  <div
                    class="border-r-[1px] h-[20px]"
                    :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                  >
                    {{ $t('floor_number') }}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody v-if="buildingInfo.floors.length">
              <CommonBuildingAddFloorItem
                v-for="(_, index) in buildingInfo.floors"
                :key="index"
                :index="index"
                :read-only="true"
              />
            </tbody>
            <tbody v-else>
              <tr class="h-[150px]">
                <td
                  :colspan="100"
                  class="border-b-[1px]"
                  :class="[lightMode ? 'border-[#f0f0f0]' : 'border-[#303030]']"
                >
                  <div class="h-full w-full">
                    <div
                      class="flex flex-col items-center justify-center overflow-hidden"
                      :style="{ width: `${pageContentWidth - 2}px` }"
                    >
                      <svg
                        v-if="lightMode"
                        width="64"
                        height="41"
                        viewBox="0 0 64 41"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                          <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                          <g fill-rule="nonzero" stroke="#d9d9d9">
                            <path
                              d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                            ></path>
                            <path
                              d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                              fill="#fafafa"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      <svg v-else width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                          <ellipse fill="#272727" cx="32" cy="33" rx="32" ry="7"></ellipse>
                          <g fill-rule="nonzero" stroke="#3e3e3e">
                            <path
                              d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                            ></path>
                            <path
                              d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                              fill="#1d1d1d"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      <p class="mt-[8px]" :class="[lightMode ? 'text-[#00000040]' : 'text-[#ffffff40]']">
                        {{ $t('no_data') }}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>{{ $t('total') }}: {{ buildingInfo.floors.length }}</p>
      </div>
      <div class="mt-10">
        <div v-if="buildingInfo.floors.length" class="flex items-center">
          <h2 class="text-xl font-bold">{{ $t('floor') }}</h2>
          <div class="ms-5">
            <a-select
              id="select_floor_3"
              v-model:value="selectedFloor"
              style="width: 150px"
              placeholder="{{ $t('select_floor') }}"
            >
              <a-select-option :value="-1" class="hidden">{{ $t('select_floor') }}</a-select-option>
              <a-select-option v-for="(_, index) in buildingInfo.floors" :key="index">{{ index + 1 }}</a-select-option>
            </a-select>
          </div>
        </div>
        <div v-if="selectedFloor !== -1" class="mt-10">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold">{{ $t('room_list') }}</h2>
          </div>
          <div class="mt-3 mb-2">
            <table class="w-full">
              <thead
                class="border-b-[1px]"
                :class="[lightMode ? 'bg-[#FAFAFA] border-[#8080801a]' : 'bg-[#323232] border-[#80808040]']"
              >
                <tr>
                  <th class="text-sm font-normal text-center align-middle py-[16px] w-[150px]">
                    <div
                      class="border-r-[1px] h-[20px]"
                      :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                    >
                      {{ $t('room_no') }}
                    </div>
                  </th>
                  <th class="text-sm font-normal text-center align-middle py-[16px] w-[150px]">
                    <div
                      class="border-r-[1px] h-[20px] flex items-center justify-center"
                      :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                    >
                      {{ $t('status') }}
                      <div class="flex items-center">
                        <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
                      </div>
                    </div>
                  </th>
                  <th class="text-sm font-normal text-center align-middle py-[16px] w-[200px]">
                    <div
                      class="border-r-[1px] h-[20px] flex items-center justify-center"
                      :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                    >
                      {{ $t('area') }}
                      <div class="flex items-center">
                        <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
                      </div>
                    </div>
                  </th>
                  <th class="text-sm font-normal text-center align-middle py-[16px] w-[500px]">
                    <div
                      class="border-r-[1px] h-[20px]"
                      :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                    >
                      {{ $t('description') }}
                    </div>
                  </th>
                  <th class="text-sm font-normal text-center align-middle py-[16px]">
                    <div
                      class="border-r-[1px] h-[20px] flex items-center justify-center"
                      :class="[lightMode ? 'border-[#8080801a]' : 'border-[#80808040]']"
                    >
                      {{ $t('image') }}
                      <div class="flex items-center">
                        <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody v-if="buildingInfo.floors[selectedFloor].rooms.length">
                <CommonBuildingAddRoomItem
                  v-for="(room, index) in buildingInfo.floors[selectedFloor].rooms"
                  :key="index"
                  :index="index"
                  :room="room"
                  :floor="selectedFloor"
                  :read-only="true"
                />
              </tbody>
              <tbody v-else>
                <tr class="h-[150px]">
                  <td
                    :colspan="100"
                    class="border-b-[1px]"
                    :class="[lightMode ? 'border-[#f0f0f0]' : 'border-[#303030]']"
                  >
                    <div class="h-full w-full">
                      <div
                        class="flex flex-col items-center justify-center overflow-hidden"
                        :style="{ width: `${pageContentWidth - 2}px` }"
                      >
                        <svg
                          v-if="lightMode"
                          width="64"
                          height="41"
                          viewBox="0 0 64 41"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                            <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                            <g fill-rule="nonzero" stroke="#d9d9d9">
                              <path
                                d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                              ></path>
                              <path
                                d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                                fill="#fafafa"
                              ></path>
                            </g>
                          </g>
                        </svg>
                        <svg v-else width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                          <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                            <ellipse fill="#272727" cx="32" cy="33" rx="32" ry="7"></ellipse>
                            <g fill-rule="nonzero" stroke="#3e3e3e">
                              <path
                                d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                              ></path>
                              <path
                                d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                                fill="#1d1d1d"
                              ></path>
                            </g>
                          </g>
                        </svg>
                        <p class="mt-[8px]" :class="[lightMode ? 'text-[#00000040]' : 'text-[#ffffff40]']">
                          {{ $t('no_data') }}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>{{ $t('total') }}: {{ selectedFloor !== -1 ? buildingInfo.floors[selectedFloor].rooms.length : 0 }}</p>
        </div>
      </div>
    </div>
    <div class="min-w-[350px] max-w-[350px] h-full">
      <div class="flex">
        <h2 class="text-xl">{{ $t('building_image') }}</h2>
        <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
      </div>
      <div class="flex flex-col">
        <div v-for="(image, index) in imageList" :key="index" class="mt-3">
          <img :src="image" :alt="$t('building_image') + ` ${index}`" class="w-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { svgPaths } from '~/consts/svg_paths';
import type { NewBuildingInfo } from '~/types/building';
import { getBase64 } from '#build/imports';
import type { User } from '~/types/user';

// ---------------------- Variables ----------------------
const lightModeCookie = useCookie('lightMode');
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const props = defineProps({
  buildingInfo: {
    type: Object as PropType<NewBuildingInfo>,
    required: true,
  },
  step: {
    type: Number,
    required: true,
  },
  managers: {
    type: Array as PropType<User[]>,
    required: true,
  },
});
const buildingInfo = toRef(props, 'buildingInfo');
const step = toRef(props, 'step');
const imageList = ref<string[]>([]);
const { $event } = useNuxtApp();
const selectedFloor = ref<number>(-1);
const pageContentWidth = ref(0);

// ---------------------- Functions ----------------------
function renderImageList() {
  const files = buildingInfo.value.images.map((image) => image.originFileObj);
  imageList.value = [];
  Array.from(files).forEach(async (file) => {
    if (file) {
      const base64 = await getBase64(file);
      imageList.value.push(base64 as string);
    }
  });
}

// ---------------------- Watchers ----------------------
watch(step, () => {
  renderImageList();
});

// ---------------------- Event Listeners ----------------------
$event.on('resetSelectedFloor', () => {
  selectedFloor.value = -1;
});

// ---------------------- Lifecycles ----------------------
onMounted(() => {
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      pageContentWidth.value = entry.contentRect.width;
    }
  });

  resizeObserver.observe(document.getElementById('add_building_step_1_left_side')!);
});
</script>
