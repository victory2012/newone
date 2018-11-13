module.exports = {
  platform: 'Platform',
  manufacturer: 'Manufacturer',
  administrator: 'Administrator',
  customer: 'Customer',
  adminIden: 'User',
  internetErr: 'Service request time out, please try again later.',
  mapError: 'Map failed to load, please check network connection.',
  connectErr: 'Service request time out, please try again later.',
  responseCode: {
    timeOut: 'Login timed out, please log in again.',
    sessionOut: 'The current session has expired.', // 1
    parameterErr: 'Invalid parameter.', // 10
    permissions: 'Permission denied.', // 20
    dataExists: 'Data already exists.', // 30
    sendCode: 'SMS failed to send.', // 40
    smscodeErr: 'Verification code is incorrect or has expired.', // 41
    accountExists: 'Account already exists.', // 101001
    phoneExists: 'Mobile phone number already exists.', // 101002
    emailExists: 'Mailbox already exists.', // 101003
    accountOrPwdErr: 'Invalid account or password.', // 104001
    userNotExist: 'The user does not exist.', // `104002`: 用户不存在
    companyExists: 'The company already exists.', // 201001
    hasInvalidDevice:
      'There are still valid devices that must be deleted first, please delete them.', // 202001
    hasInvalidHost:
      'There are still valid batteries that must be deleted first, please delete them.', // 202002
    notFindCompany: 'The company not found.', // 204001
    deviceExists: 'The device already exists.', // 301001
    notFindDevice: 'The device not found.', // 301002
    gpsDeviceExists: 'The device already exists.', // 301101 --电池gps设备已存在--
    MonitorDeviceExists: 'The device already exists.', // 301201 --电池检测设备已存在--
    deviceRunning: 'The device is working.', // 302001
    deviceBind: 'The device has been bound.', // 303001
    hasHost: 'The battery already exists.', // 401001
    hostBind: 'The battery has been bound.', // 403002
    batteryGroupExists: 'The battery pack already exists.', // 401201
    batteryModelExists: 'The battery pack model already exists.', // 401211
    batteryModelNotFind: 'The battery pack model not found.', // 401212
    batterySpecExists: 'The battery pack specification already exists.', // 401213
    batterySpecNotFind: 'The battery pack specification not found.', // 401214
    batterySingleModelExists: 'The battery cell specification already exists.', // 401215
    batterySingleModelNotFind: 'The battery cell specification not found.', // 401216
    innerNoticeExists:
      'The notification rule of this platform for abnormal alarms already exists.', // 501211
    InnerNoticeUserExists: 'The notified user of this platform already exists.', // 501221
    InnerNoticeOverrun:
      'The number of notified users of this platform exceeds the maximum.', // 501222
    outerNoticeUserExists:
      'The Mobile phone number used by the notified person who is outside the platform already exists.', // 501231
    outerNoticeOverrun:
      'The number of notified persons outside the platform exceeds the maximum.' // 501232
  },
  loginMsg: {
    userNameMsg: 'Please enter user id.',
    password: 'Please enter password.',
    projectName: 'Battery Tracking Management System',
    subProjectName: 'Battery Tracking Management System',
    RMaccount: 'Remember the account',
    RMpassword: 'Remember the password',
    accountPlace: 'User Id',
    passwordPlace: 'Password',
    loginBtn: 'Login',
    errorMsg: {
      account: 'Please enter user id.',
      password: 'Please enter password.',
      phoneNub: 'Please enter phone number.',
      checkPhone: 'The phone number is in the wrong format.',
      smsCodeErr: 'Please enter SMS verification code.'
    },
    labelAccPass: 'Account password login.',
    labelSmsCode: 'Verification code login.',
    phone: 'Mobile Number',
    smsCode: 'Verification Code',
    getSmsCode: 'Get verification code',
    smsSuccess: 'The verification code was sent successfully.',
    tips: 'Tips: '
  },
  successTips: {
    addSuccess: 'Successfully added.',
    delSuccess: 'Successfully deleted.',
    unbindSuccess: 'Successfully unbind.',
    bindSuccess: 'Successful binding.',
    batchSuccess: 'Successfully added in batches.',
    recoverySuccess: 'Successfully restored from the blacklist.',
    changeSuccess: 'Successfully modified.',
    addBlackSucc: 'Pulled into the blacklist successfully.',
    regDevice: 'Device successfully registered.',
    recoverySuc: 'Succcessfully unallocated.',
    distributionSuc: 'Successfully allocated.',
    regBattery: 'Battery successfully registered.'
  },
  batch: {
    formatErr: 'Format of the imported data file is xls or xlsx.',
    volumeErr: 'Imported data files cannot be larger than 1M.',
    nodata: 'The uploaded file is empty, please check and correct it.',
    complete: 'Please complete the file data.',
    betteryCodeRepeat:
      'Battery id cannot be repeated, please check and correct it.',
    timeFormatErr: 'Time format is not supported, please change to text format.'
  },
  userInfo: {
    userMsg: 'User Profile',
    pasword: 'Change Password',
    logOut: 'Logout'
  },
  menu: {
    // 菜单列表
    overview: 'Overview',
    realposition: 'Real Location',
    history: 'Motion Track',
    fence: 'Geofence',
    batteryManage: 'Battery Management',
    batteryList: 'Battery Profiles',
    alarm: 'Battery Alarms',
    userManage: 'User Management',
    device: 'Device Management',

    deviceList: 'Device Profiles',
    // deviceDefriend: '恢复拉黑设备.',
    batteryInfo: 'Battery Situation',
    defriend: 'Restore Black',
    runStatus: 'Working Status',
    compare: 'Comparison Analysis',
    setting: 'Configuration Management',
    threshold: 'Alarm Threshold',
    sortByModel: 'By battery model',
    sortByCompany: 'Universal',
    WarningNotice: 'Alarm Notification',
    receiveList: 'All Users',
    addReceive: 'Notified Users',
    OuterReceive: 'Notified Outsiders',
    Allocation: 'Battery Allocation',
    alarmData: 'Battery Alarms'
  },
  overview: {
    total: 'All',
    newAdd: 'This Month',
    valid: 'Valid',
    alarmed: 'Alarmed',
    RunNormal: 'Normal Run',
    batteryModel: 'Model',
    provence: 'Area'
  },
  positions: {
    title1: 'Device Profiles',
    title2: 'Online Battery List',
    lookAll: 'View All',
    track: 'Motion Track',
    onLine: 'Online',
    offline: 'Offline',
    batteryCode: 'Battery Id',
    deviceCode: 'Device Id',
    updateTime: 'Time',
    intersection: 'Road Junction',
    latLng: 'Coordinate',
    address: 'Address',
    getAdressErr: 'Address acquisition failed.'
  },
  group: {
    allGroup: 'Pack',
    single: 'Unit',
    high: 'High',
    mid: 'Medium',
    low: 'Low'
  },
  toggleTip: {
    open: 'Open',
    close: 'Close'
  },
  history: {
    startTime: 'Please enter start time.',
    endTime: 'Please enter end time.',
    start: 'Start',
    pause: 'Pause',
    continue: 'continue',
    stop: 'Stop',
    heatActive: 'Hot Zone',
    TrackReplay: 'Playback',
    times: 'Time',
    batteryList: 'Battery Profiles',

    online: 'Online',
    offLine: 'Offline',
    checkErr: 'Start time must before end time.',
    noData: 'This device has no data during the current time period.',
    noDevice: 'There is no corresponding device, please register first.',
    latLng: 'Coordinate',
    address: 'Address',
    from: 'From ',
    to: 'To ',
    exportBtn: 'Export to excel',
    cycle: 'Amounts of electrical cycle',
    chargeDuration: 'Charging time',
    dischargeDuration: 'Discharge time',
    avgChargeDuration: 'Average charging time',
    avgDischargeDuration: 'Average discharge time',
    empty: 'Idle time',
    fluidTimes: 'Amounts of water infusion',
    avgFluidDuration: 'Average duration of water infusion',
    historyWarn: 'Historical alarm',
    historyfluid: 'Historical water infusion',
    week: 'Last one week',
    mounth: 'Last on month',
    threemonth: 'Last three months',
    sixmounth: 'Last six months',
    year: 'Last one year',
    all: 'Full life time',
    maker: 'Editor',
    makeTime: 'Edit time',
    fileName: 'Please enter the name of the export file.',
    tips: 'Prompt',
    fluidTime: 'Time',
    fluidTemp: 'Temperature',
    LengthOfYime: 'Time interval from last water infusion',
    No: 'No.',
    point: 'point',
    junction: 'Road Junction',
    track: 'Motion Track'
  },
  timeBtn: {
    cancle: 'Cancel',
    sure: 'Submit',
    clear: 'Empty',
    all: 'All',
    del: 'Delete',
    confirm: 'Confirm',
    reset: 'Reset',
    save: 'Submit'
  },
  fence: {
    cancelSeting: 'Cancel',
    sureSeting: 'Submit',
    back: 'Quit',
    addBtn: 'Add geofence on map.',
    delBtn: 'Remove geofence on map.',
    tipMsg: {
      addSuccess: 'Added Successfully.',
      delSuccess: 'Removed Successfully.',
      addPointer: 'Please select the geofence point on map.',
      selectToDel: 'Please choose the geofence you want remove on map.',
      morePointer: 'Select 10 points at most.'
    }
  },
  batteryList: {
    batteryVoltage: 'Rated Voltage',
    batteryCapacity: 'Rated Capacity',
    singleBattery: 'Unit Specification',
    choseDevice: 'Device Id (optional)',
    serial: 'No.',
    batteryCode: 'Battery Id',
    binding: 'Binding Status',
    running: 'Operating Satus',
    detail: 'Action',
    online: 'Online',
    offline: 'Offline',
    noBind: 'Unbound',
    hasBind: 'Bound',
    batteryDetail: 'Detail',
    batteryNumber: 'Battery Id',
    model: 'Model',
    specif: 'Specification',
    customer: 'Customer',
    deviceCode: 'Device Id',
    bindStatus: 'Binding Status',
    onlineStatus: 'Online Status',

    view: 'View',
    batteryAddBtn: 'Battery Registration',
    enterprise: 'Manufacturer',
    customerCom: 'Customer',
    createDate: 'Date of production.',
    manufactureDate: 'Date of manufacture.',
    warrantyDate: 'Warranty',
    cancel: 'Cancel',
    sure: 'Confirm',
    warn: {
      enterprise: 'Please enter manufacturer id.',
      customerCom: 'Please enter Customer id.',
      batteryCode: 'Please enter battery id.',
      model: 'Please enter battery model.',
      specif: 'Please enter battery specification.',
      createDate: 'Date of production',
      manufactureDate: 'Date of manufacture',
      warrantyDate: 'Warranty',
      deviceId: 'Please enter device id.',
      content: 'The content can not be blank.',
      batteryVoltage: 'Please enter the rated voltage.',
      batteryCapacity: 'Please enter the rated capacity.',
      singleBattery: 'Please choose battery unit specification.'
    },
    batteries: 'New Battery',
    batchImport: 'Batch Import.',
    defriend: 'Restore Black',
    runStatus: 'Working Status',
    handle: 'Action',
    unBind: 'Unbind',
    bind: 'Bind',
    black: 'Black',
    detele: 'Delete',
    batteryBindDevice: 'Battery is bound to the device.',
    addModel: 'Add new pack model',
    addSpecif: 'Add new pack specification',
    addSinggleSpecif: 'Add new unit specification',
    singgleSpecif: 'Add new unit specification',
    deleteTip: 'Are you sure you want to delete this battery pack?',
    search: 'Search',
    clear: 'Empty',
    searchContent: 'Battery/Device Id',
    name: 'Company Name',
    recovery: 'Retore'
  },
  runState: {
    realData: 'Real Time',
    historyData: 'Historical',
    alarmData: 'Alarm',
    batteryCode: 'Please enter battery id.',
    selectBattery: 'Please select a battery pack first.'
  },
  realTime: {
    time: 'Time',
    temperature: 'Temperature',
    fluid: 'Electrolyte Level',
    voltage: 'Pack Voltage',
    singleVoltage: 'Unit Voltage',
    current: 'Current',
    quantity: 'Capacity',
    fourHour: 'Data for the past 4 hours',
    update: 'Automatically update',
    query: 'Active Inquiry',
    normal: 'Normal',
    abnormal: 'Abnormal',
    refresh: 'Update Time',
    warn: 'Alarm',
    times: '',
    totalWarn: 'Total Alarms'
  },
  alarmList: {
    serial: 'No.',
    time: 'Alarm Time',
    batteryCode: 'Battery Id',
    content: 'Alarm Description',
    handle: 'Action',
    detail: 'Detail',
    batteryDetail: 'Battery Detail',
    batteryNumber: 'Battery Id',
    specif: 'Specification',
    customer: 'Customer',
    deviceCode: 'Device Id',
    grid: 'Coordinate Position',
    position: 'Location',
    location: 'View',
    alarmItem: 'Alarm Item',
    alarmHierarchy: 'Hierarchy',
    alarmLevel: 'Level',
    more: 'More',
    batteries: 'Batteries',
    thride: 'Alarm Threshold',
    realDate: 'Actual Data',
    view: 'View',
    custorm: 'Customer',
    latLng: 'Location',
    warnData: 'Alarm Data',
    endTime: 'End Time',
    startTime: 'Start Time'
  },
  useMsg: {
    serial: 'No.',
    name: 'User Id',
    accountIdentity: 'Account Type',
    companyIdentity: 'Company Type',
    detail: 'Detail',
    administrator: 'Administrator',
    superAdministrator: 'Super Administrator',
    userDetail: 'User Profile',
    userName: 'User Id',
    accountRole: 'Account Type',
    enterpriseRole: 'Company Type',
    enterpriseName: 'Company Name',
    phone: 'Mobile',
    email: 'Email',
    loginPwd: 'Login Password',
    add: {
      china: 'In China',
      international: 'Abroad',
      userName: 'User Id',
      password: 'Password',
      phone: 'Mobile',
      email: 'Email(optional)',
      enterpriseName: 'Company Name',
      nature: 'Company Type',
      manufacturer: 'New Manufacturer Administrator',
      customer: 'New Customer Administrator',
      manuProduct: 'New Manufacturer User',
      cusNoraml: 'Add common users',
      cancel: 'Cancel',
      sure: 'Submit'
    },
    warn: {
      userName: 'Please enter user id.',
      nameLimit: 'The user id at least 4 characters.',
      password: 'Please enter password.',
      passwordLimit: 'The password at least 6 characters.',
      phone: 'Please enter mobile number.',
      phoneCheck: 'Wrong format of mobile number entered.',
      emailCheck: 'Wrong format of mailbox entered.',
      enterprise: 'Please eneter name of company.',
      nature: 'Please choose nature of company.'
    },
    success: 'Created Successfully.',
    no: 'No Data',
    nickName: 'Nickname',
    changeRole: 'Change Permission',
    delUserWarn:
      'Your Operation will delete this user. Do you want to continue?',
    delCompanyWarn:
      'Your Operation will delete this company and all users under it. Do you want to continue?'
  },
  defaultRole: {
    addBatteries: 'Battery Enrollment',
    addblack: 'Black and Restore',
    historyData: 'Historical Data',
    alarm: 'Alarm Event',
    sameAnalysis: 'Comparison Analysis',
    personalInfo: 'Personal Maintenance',
    allocation: 'Battery Allocation'
  },
  device: {
    serial: 'No.',
    deviceCode: 'Devicd Id',
    bindStatus: 'Binding Status',
    runStatus: 'Online Status',
    detail: 'Detail',
    deviceDetail: 'Device Detail',
    manufacturerName: 'Company Name',
    createTime: 'Create time',
    batteryCode: '',
    onlineStatus: 'Online Status',
    device: 'Device',
    location: 'View',
    addDevice: 'Device Registration',
    nobind: 'Unbound',
    hasbind: 'Bound',
    online: 'Online',
    offline: 'Offline',
    regDevice: 'Device Registration',
    enterprise: 'Manufacturer',
    upLevel: 'Device Upgrade',
    deviceCategory: 'Device Type',
    company: 'Related usiness',
    registed: 'Registed',
    noregist: 'Unregistered',
    delTips: 'Are you sure you want to delete this device?',
    selectCampany: 'Please choose the company',
    batteryGps: 'Battery Tracking',
    batteryMonitor: 'Battery Monitoring'
  },
  addDevice: {
    title: 'Device Registration',
    back: 'Cancel',
    deviceCode: 'Devicd Id',
    manufacturer: 'Manufacturer',
    Customer: 'Customer',
    createBtn: 'Submit',
    noData: 'No Data',
    errorTip: 'Please enter devicd id.',
    manufacturerErr: 'Please choose Manufacturer',
    success: 'Created successfully.'
  },
  user: {
    edit: 'Edit',
    save: 'Submit',
    cancel: 'Cancel',
    userName: 'User Id',
    userRole: 'Account Type',
    enterpriseRole: 'Company Type',
    enterpriseName: 'Company Name',
    phone: 'Mobile',
    email: 'Email',
    no: 'No Data',
    seccess: 'Changed Successfully.',
    userInfo: 'Personal information editing',
    nameErr: 'Please enter the user id.',
    phoneErr: 'Please enter the mobile phone number.',
    phoneCheck: 'Wrong format of mobile phone number.'
  },
  password: {
    new: 'new password',
    placeholder: 'Please enter password.',
    changeBtn: 'Change password',
    error: 'Please enter password.',
    success: 'Changed successfully.',
    passwordLimit: 'Password length is 3 to 10 characters.'
  },
  googleAbno: {
    return: 'Back',
    title: 'View the current location.',
    OUT: 'OUT',
    Geofence: 'Out of the Geofence.',
    nowPosition: 'Current Location'
  },
  comparison: {
    same: 'Same battery pack',
    diffrence: 'Different battery pack',
    comparData: 'Comparison',
    batteryCode: 'Battery Id',
    timeRange: 'Please select range of time.',
    comparWay: 'Please choose a comparison method.',
    addCompar: 'Please add a battery pack',
    most: 'You could choose up to ',
    item: 'items.',
    deviceId: 'Device Id',
    YearOnYear: 'Compare with the same period of last year',
    monthOnMonth: 'Compare with previous period',
    thisPeriod: 'This period',
    lastPeriod: 'Previous period',
    batteryUse: 'Battery Situation',
    alarmTimes: 'Amounts of alarm',
    charageSituation: 'Charging condition',
    charageTimes: 'Amounts of charging',
    discharageSituation: 'Discharge condition',
    discharageTimes: 'Amounts of discharge',
    selectBattery: 'Please choose a battery.',
    addOneBattery: 'You should join one battery',
    addTwoBattery: 'You should join two batteries',
    changeBattery: 'Please change a battery.',
    alarm: 'Alarm'
  },
  notice: {
    status: 'Status',
    hasAdd: 'added',
    noAdd: 'not added',
    viewUser: 'View added users',
    atMost: '(up to 128 users)',
    add: 'Add',
    outerMost: 'Outsiders added(up to 3 persons)'
  },
  stock: {
    unassigned: 'Unallocated',
    custormBat: 'Allocated',
    selectAll: 'Select All',
    distribution: 'Allocate',
    recovery: 'Unallocate',
    load: 'Loading...',
    noData: 'blank'
  },
  threshold: {
    changeThreshold: 'Modify Threshold',
    recovery: 'Restore universal',
    singleVoltage:
      'Upper threshold value of unit voltage while battery is in charging',
    singleDisVoltage:
      'Lower threshold value of unit voltage while battery is in discharging',
    maxColtage:
      'Upper threshold value of pack voltage while battery is in charging',
    minDVoltage:
      'Lower threshold value of pack voltage while battery is in discharging',
    maxCCurrent:
      'Upper threshold coefficient of current while battery is in charging',
    maxDCurrent:
      'Upper threshold coefficient of current while battery is in discharging',
    maxCTemperat:
      'Upper threshold value of temperature while battery is in charging',
    minCTemperat:
      'Lower threshold value of temperature while battery is in charging',
    maxDTemperat:
      'Upper threshold value of temperature while battery is in discharging',
    minDTemperat:
      'Lower threshold value of temperature while battery is in discharging',
    maxFODays: 'Days of overrun time while battery is lack of electrolyte',
    maxCCapacity:
      'Upper threshold coefficient of capacity while battery is in charging',
    minCCapacity:
      'Lower threshold coefficient of capacity while battery is in charging',
    warn: {
      singleVoltage:
        'Please enter the upper threshold value of unit voltage while battery is in charging.',
      singleDisVoltage:
        'Please enter the lower threshold value of unit voltage while battery is in discharging.',
      maxColtage:
        'Please enter the upper threshold value of pack voltage while batteryialarm n charging.',
      minDVoltage:
        'Please enter the lower threshold value of pack voltage while battery is in discharging',
      maxCCurrent:
        'Please enter the upper threshold coefficient of current while battery is in charging.',
      maxDCurrent:
        'Please enter the upper threshold coefficient of current while battery is in discharging.',
      maxCTemperat:
        'Please enter the upper threshold value of temperature while battery is in charging.',
      minCTemperat:
        'Please enter the lower threshold value of temperature while battery is in charging.',
      maxDTemperat:
        'Please enter the upper threshold value of temperature while battery is in discharging.',
      minDTemperat:
        'Please enter the lower threshold value of temperature while battery is in discharging.',
      maxFODays:
        'Please enter the days of overrun time while battery is lack of electrolyte',
      maxCCapacity:
        'Please enter the upper threshold coefficient of capacity while battery is in charging.',
      minCCapacity:
        'Please enter the lower threshold coefficient of capacity while battery is in charging.',
      selectBatModel: 'Please select battery model.',
      modelNoThres: 'The threshold on this battery model is not deployed.',
      NOverall: 'The universal threshold is not deployed.'
    }
  },
  time: {
    day: 'Day',
    hour: 'Hour',
    mins: 'Minute',
    sec: 'Second'
  }
};
