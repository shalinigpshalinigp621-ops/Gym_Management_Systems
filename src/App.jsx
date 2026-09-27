import { useEffect, useState } from 'react'
import './App.css'

// Persistent state helper: loads saved data first and writes every change back to localStorage.
function usePersistentState(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      if (saved !== null) return JSON.parse(saved)
    } catch (error) {
      console.error(`Could not load ${key} from localStorage:`, error)
    }
    return defaultValue
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Could not save ${key} to localStorage:`, error)
    }
  }, [key, value])

  return [value, setValue]
}

function App() {
  const [page, setPage] = useState('dashboard')

  // ================= MEMBERS =================
  const [members, setMembers] = usePersistentState('fitzone_members', [
    {
      id: 1,
      name: 'Shalu',
      email: 'shalu@gmail.com',
      phone: '9876543210',
      plan: 'Gold'
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      email: 'rahul@gmail.com',
      phone: '9876543211',
      plan: 'Premium'
    }
  ])

  const [showMemberForm, setShowMemberForm] = useState(false)

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'Gold'
  })

  const [memberSearch, setMemberSearch] = useState('')
  const [memberPlanFilter, setMemberPlanFilter] = useState('All')

  const addMember = () => {
    if (!newMember.name || !newMember.email || !newMember.phone) {
      alert('Please fill all member details')
      return
    }

    setMembers((currentMembers) => [
      ...currentMembers,
      {
        id: Date.now(),
        ...newMember
      }
    ])

    setNewMember({
      name: '',
      email: '',
      phone: '',
      plan: 'Gold'
    })

    setShowMemberForm(false)
  }

  const deleteMember = (id) => {
    setMembers((currentMembers) =>
      currentMembers.filter((member) => member.id !== id)
    )
  }

  // ================= TRAINERS =================
  const [trainers, setTrainers] = usePersistentState('fitzone_trainers', [
    {
      id: 1,
      name: 'Arjun',
      specialty: 'Strength Training',
      phone: '9876500001'
    },
    {
      id: 2,
      name: 'Priya',
      specialty: 'Yoga',
      phone: '9876500002'
    }
  ])

  const [showTrainerForm, setShowTrainerForm] = useState(false)

  const [newTrainer, setNewTrainer] = useState({
    name: '',
    specialty: '',
    phone: ''
  })

  const addTrainer = () => {
    if (!newTrainer.name || !newTrainer.specialty || !newTrainer.phone) {
      alert('Please fill all trainer details')
      return
    }

    setTrainers((currentTrainers) => [
      ...currentTrainers,
      {
        id: Date.now(),
        ...newTrainer
      }
    ])

    setNewTrainer({
      name: '',
      specialty: '',
      phone: ''
    })

    setShowTrainerForm(false)
  }

  const deleteTrainer = (id) => {
    setTrainers((currentTrainers) =>
      currentTrainers.filter((trainer) => trainer.id !== id)
    )
  }

  // ================= MEMBERSHIP PLANS =================
  const [plans, setPlans] = usePersistentState('fitzone_plans', [
    {
      id: 1,
      name: 'Basic',
      price: 999,
      duration: '1 Month',
      icon: '🥉'
    },
    {
      id: 2,
      name: 'Gold',
      price: 1999,
      duration: '3 Months',
      icon: '🥇'
    },
    {
      id: 3,
      name: 'Premium',
      price: 3999,
      duration: '6 Months',
      icon: '💎'
    },
    {
      id: 4,
      name: 'Platinum',
      price: 2000,
      duration: '1 Month',
      icon: '👑'
    }
  ])

  const [showPlanForm, setShowPlanForm] = useState(false)

  const [newPlan, setNewPlan] = useState({
    name: '',
    price: '',
    duration: '1 Month',
    icon: '⭐'
  })

  const addPlan = () => {
    if (!newPlan.name || !newPlan.price) {
      alert('Please enter plan name and price')
      return
    }

    setPlans((currentPlans) => [
      ...currentPlans,
      {
        id: Date.now(),
        ...newPlan,
        price: Number(newPlan.price)
      }
    ])

    setNewPlan({
      name: '',
      price: '',
      duration: '1 Month',
      icon: '⭐'
    })

    setShowPlanForm(false)
  }

  const deletePlan = (id) => {
    setPlans((currentPlans) =>
      currentPlans.filter((plan) => plan.id !== id)
    )
  }

  // ================= ATTENDANCE =================
  const [attendance, setAttendance] = usePersistentState('fitzone_attendance', [
    {
      id: 1,
      member: 'Shalu',
      date: '2026-09-21',
      status: 'Present'
    },
    {
      id: 2,
      member: 'Rahul Kumar',
      date: '2026-09-21',
      status: 'Present'
    }
  ])

  const [newAttendance, setNewAttendance] = useState({
    member: '',
    date: '',
    status: 'Present'
  })

  const addAttendance = () => {
    if (!newAttendance.member || !newAttendance.date) {
      alert('Please select member and date')
      return
    }

    setAttendance((currentAttendance) => [
      ...currentAttendance,
      {
        id: Date.now(),
        ...newAttendance
      }
    ])

    setNewAttendance({
      member: '',
      date: '',
      status: 'Present'
    })
  }

  const deleteAttendance = (id) => {
    setAttendance((currentAttendance) =>
      currentAttendance.filter((record) => record.id !== id)
    )
  }

  // ================= WORKOUT & DIET =================
  const [workoutPlans, setWorkoutPlans] = usePersistentState('fitzone_workoutPlans', [
    {
      id: 1,
      member: 'Shalu',
      workout: 'Full Body Strength Training',
      diet: 'High Protein Diet',
      duration: '4 Weeks'
    },
    {
      id: 2,
      member: 'Rahul Kumar',
      workout: 'Cardio and Weight Loss',
      diet: 'Low Calorie Balanced Diet',
      duration: '8 Weeks'
    }
  ])

  const [newWorkoutPlan, setNewWorkoutPlan] = useState({
    member: '',
    workout: '',
    diet: '',
    duration: '4 Weeks'
  })

  const addWorkoutPlan = () => {
    if (
      !newWorkoutPlan.member ||
      !newWorkoutPlan.workout ||
      !newWorkoutPlan.diet
    ) {
      alert('Please fill all workout and diet details')
      return
    }

    setWorkoutPlans((currentWorkoutPlans) => [
      ...currentWorkoutPlans,
      {
        id: Date.now(),
        ...newWorkoutPlan
      }
    ])

    setNewWorkoutPlan({
      member: '',
      workout: '',
      diet: '',
      duration: '4 Weeks'
    })
  }

  const deleteWorkoutPlan = (id) => {
    setWorkoutPlans((currentWorkoutPlans) =>
      currentWorkoutPlans.filter((plan) => plan.id !== id)
    )
  }

  // ================= PAYMENTS =================
  const [payments, setPayments] = usePersistentState('fitzone_payments', [
    {
      id: 1,
      member: 'Shalu',
      amount: 1999,
      date: '2026-09-20',
      method: 'UPI',
      status: 'Paid'
    },
    {
      id: 2,
      member: 'Rahul Kumar',
      amount: 3999,
      date: '2026-09-18',
      method: 'Card',
      status: 'Paid'
    },
    {
      id: 3,
      member: 'Anjali',
      amount: 999,
      date: '2026-09-15',
      method: 'Cash',
      status: 'Pending'
    }
  ])

  const [showPaymentForm, setShowPaymentForm] = useState(false)

  const [newPayment, setNewPayment] = useState({
    member: '',
    amount: '',
    date: '',
    method: 'UPI',
    status: 'Paid'
  })

  const addPayment = () => {
    if (
      !newPayment.member ||
      !newPayment.amount ||
      !newPayment.date
    ) {
      alert('Please fill all payment details')
      return
    }

    setPayments((currentPayments) => [
      ...currentPayments,
      {
        id: Date.now(),
        ...newPayment,
        amount: Number(newPayment.amount)
      }
    ])

    setNewPayment({
      member: '',
      amount: '',
      date: '',
      method: 'UPI',
      status: 'Paid'
    })

    setShowPaymentForm(false)
  }

  const deletePayment = (id) => {
    setPayments((currentPayments) =>
      currentPayments.filter((payment) => payment.id !== id)
    )
  }

  // ================= PROFILE =================
  const [profile, setProfile] = usePersistentState('fitzone_profile', {
    name: 'Admin',
    email: 'admin@fitzone.com',
    phone: '9876543210',
    gymName: 'FitZone Gym'
  })

  const [passwords, setPasswords] = useState({
    current: '',
    newPassword: '',
    confirm: ''
  })

  const saveProfile = () => {
    if (
      !profile.name ||
      !profile.email ||
      !profile.phone ||
      !profile.gymName
    ) {
      alert('Please fill all profile details')
      return
    }

    alert('Profile updated successfully!')
  }

  const changePassword = () => {
    if (
      !passwords.current ||
      !passwords.newPassword ||
      !passwords.confirm
    ) {
      alert('Please fill all password fields')
      return
    }

    if (passwords.newPassword !== passwords.confirm) {
      alert('New password and confirm password do not match')
      return
    }

    alert('Password changed successfully!')

    setPasswords({
      current: '',
      newPassword: '',
      confirm: ''
    })
  }

  // ================= DASHBOARD CALCULATIONS =================

  const paidPayments = payments.filter(
    (payment) => payment.status === 'Paid'
  )

  const totalRevenue = paidPayments.reduce(
    (total, payment) =>
      total + Number(payment.amount),
    0
  )

  const today = new Date().toISOString().split('T')[0]

  const presentToday = attendance.filter(
    (record) =>
      record.date === today &&
      record.status === 'Present'
  ).length

  const basicMembers = members.filter(
    (member) => member.plan === 'Basic'
  ).length

  const goldMembers = members.filter(
    (member) => member.plan === 'Gold'
  ).length

  const premiumMembers = members.filter(
    (member) => member.plan === 'Premium'
  ).length

  const platinumMembers = members.filter(
    (member) => member.plan === 'Platinum'
  ).length

  // ================= SIDEBAR =================

  const menuItems = [
    {
      name: 'Dashboard',
      icon: '📊',
      value: 'dashboard'
    },
    {
      name: 'Members',
      icon: '👥',
      value: 'members'
    },
    {
      name: 'Trainers',
      icon: '🏋️',
      value: 'trainers'
    },
    {
      name: 'Membership Plans',
      icon: '💳',
      value: 'plans'
    },
    {
      name: 'Attendance',
      icon: '📅',
      value: 'attendance'
    },
    {
      name: 'Workout & Diet',
      icon: '🥗',
      value: 'workout'
    },
    {
      name: 'Payments',
      icon: '💰',
      value: 'payments'
    },
    {
      name: 'Profile & Settings',
      icon: '⚙️',
      value: 'settings'
    }
  ]

  const getPageTitle = () => {
    const current = menuItems.find(
      (item) => item.value === page
    )

    return current ? current.name : 'Dashboard'
  }

  // ================= DASHBOARD =================

  const dashboard = (
    <div>

      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>
            Welcome back to FitZone Gym Management System
          </p>
        </div>
      </div>

      {/* STAT CARDS */}

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">👥</div>

          <div>
            <h3>{members.length}</h3>
            <p>Total Members</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏋️</div>

          <div>
            <h3>{trainers.length}</h3>
            <p>Total Trainers</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>

          <div>
            <h3>{presentToday}</h3>
            <p>Today's Attendance</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>

          <div>
            <h3>₹{totalRevenue}</h3>
            <p>Total Revenue</p>
          </div>
        </div>

      </div>

      {/* MEMBERSHIP OVERVIEW */}

      <div className="dashboard-section">

        <div className="section-heading">
          <div>
            <h2>Membership Overview</h2>
            <p>Current members by membership plan</p>
          </div>
        </div>

        <div className="membership-overview">

          <div className="overview-card">
            <span className="overview-icon">🥉</span>
            <h3>{basicMembers}</h3>
            <p>Basic Members</p>
          </div>

          <div className="overview-card">
            <span className="overview-icon">🥇</span>
            <h3>{goldMembers}</h3>
            <p>Gold Members</p>
          </div>

          <div className="overview-card">
            <span className="overview-icon">💎</span>
            <h3>{premiumMembers}</h3>
            <p>Premium Members</p>
          </div>

          <div className="overview-card">
            <span className="overview-icon">👑</span>
            <h3>{platinumMembers}</h3>
            <p>Platinum Members</p>
          </div>

        </div>

      </div>

      {/* RECENT MEMBERS AND PAYMENTS */}

      <div className="dashboard-two-column">

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <h2>Recent Members</h2>
              <p>Latest registered members</p>
            </div>

            <button
              className="small-button"
              onClick={() => setPage('members')}
            >
              View All
            </button>

          </div>

          <div className="recent-list">

            {members.slice(-4).reverse().map((member) => (

              <div
                className="recent-item"
                key={member.id}
              >

                <div className="recent-avatar">
                  {member.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="recent-info">

                  <strong>
                    {member.name}
                  </strong>

                  <span>
                    {member.email}
                  </span>

                </div>

                <span className="plan-badge">
                  {member.plan}
                </span>

              </div>

            ))}

          </div>

        </div>

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <h2>Recent Payments</h2>
              <p>Latest payment transactions</p>
            </div>

            <button
              className="small-button"
              onClick={() => setPage('payments')}
            >
              View All
            </button>

          </div>

          <div className="recent-list">

            {payments.slice(-4).reverse().map((payment) => (

              <div
                className="recent-item"
                key={payment.id}
              >

                <div className="payment-icon">
                  💰
                </div>

                <div className="recent-info">

                  <strong>
                    {payment.member}
                  </strong>

                  <span>
                    {payment.method} • {payment.date}
                  </span>

                </div>

                <div className="payment-amount">

                  ₹{payment.amount}

                  <small
                    className={
                      payment.status === 'Paid'
                        ? 'status-paid'
                        : 'status-pending'
                    }
                  >
                    {payment.status}
                  </small>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div className="dashboard-section">

        <div className="section-heading">

          <div>
            <h2>Quick Actions</h2>
            <p>Quickly manage your gym</p>
          </div>

        </div>

        <div className="quick-actions">

          <button
            className="quick-action"
            onClick={() => {
              setPage('members')
              setShowMemberForm(true)
            }}
          >
            <span>👥</span>
            <strong>Add Member</strong>
            <small>Register a new member</small>
          </button>

          <button
            className="quick-action"
            onClick={() => {
              setPage('payments')
              setShowPaymentForm(true)
            }}
          >
            <span>💰</span>
            <strong>Add Payment</strong>
            <small>Record a payment</small>
          </button>

          <button
            className="quick-action"
            onClick={() => setPage('attendance')}
          >
            <span>📅</span>
            <strong>Attendance</strong>
            <small>Mark member attendance</small>
          </button>

          <button
            className="quick-action"
            onClick={() => setPage('workout')}
          >
            <span>🥗</span>
            <strong>Workout Plans</strong>
            <small>Manage fitness plans</small>
          </button>

        </div>

      </div>

    </div>
  )

  // ================= MEMBERS PAGE =================

  const membersPage = (
    <div>

      <div className="page-header">

        <div>
          <h1>Members</h1>
          <p>Manage and view all gym members</p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            setShowMemberForm(!showMemberForm)
          }
        >
          + Add Member
        </button>

      </div>

      {/* MEMBER SUMMARY */}

      <div className="member-summary">

        <div className="member-summary-card">

          <span>👥</span>

          <div>
            <h3>{members.length}</h3>
            <p>Total Members</p>
          </div>

        </div>

        <div className="member-summary-card">

          <span>🥇</span>

          <div>
            <h3>{goldMembers}</h3>
            <p>Gold Members</p>
          </div>

        </div>

        <div className="member-summary-card">

          <span>💎</span>

          <div>
            <h3>{premiumMembers}</h3>
            <p>Premium Members</p>
          </div>

        </div>

        <div className="member-summary-card">

          <span>👑</span>

          <div>
            <h3>{platinumMembers}</h3>
            <p>Platinum Members</p>
          </div>

        </div>

      </div>

      {/* ADD MEMBER FORM */}

      {showMemberForm && (

        <div className="form-card">

          <h2>Add New Member</h2>

          <input
            type="text"
            placeholder="Member Name"
            value={newMember.name}
            onChange={(e) =>
              setNewMember({
                ...newMember,
                name: e.target.value
              })
            }
          />

          <input
            type="email"
            placeholder="Email Address"
            value={newMember.email}
            onChange={(e) =>
              setNewMember({
                ...newMember,
                email: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={newMember.phone}
            onChange={(e) =>
              setNewMember({
                ...newMember,
                phone: e.target.value
              })
            }
          />

          <select
            value={newMember.plan}
            onChange={(e) =>
              setNewMember({
                ...newMember,
                plan: e.target.value
              })
            }
          >

            <option>Basic</option>
            <option>Gold</option>
            <option>Premium</option>
            <option>Platinum</option>

          </select>

          <button
            className="primary-button"
            onClick={addMember}
          >
            Save Member
          </button>

        </div>

      )}

      {/* SEARCH AND FILTER */}

      <div className="member-filters">

        <input
          type="text"
          placeholder="🔍 Search by name or email..."
          value={memberSearch}
          onChange={(e) =>
            setMemberSearch(e.target.value)
          }
        />

        <select
          value={memberPlanFilter}
          onChange={(e) =>
            setMemberPlanFilter(e.target.value)
          }
        >

          <option value="All">
            All Plans
          </option>

          <option value="Basic">
            Basic
          </option>

          <option value="Gold">
            Gold
          </option>

          <option value="Premium">
            Premium
          </option>

          <option value="Platinum">
            Platinum
          </option>

        </select>

      </div>

      {/* MEMBERS TABLE */}

      <div className="table-card">

        <table>

          <thead>

            <tr>
              <th>Member</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Membership Plan</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {members
              .filter((member) => {

                const searchText =
                  memberSearch.toLowerCase()

                const matchesSearch =
                  member.name
                    .toLowerCase()
                    .includes(searchText) ||
                  member.email
                    .toLowerCase()
                    .includes(searchText)

                const matchesPlan =
                  memberPlanFilter === 'All' ||
                  member.plan === memberPlanFilter

                return (
                  matchesSearch &&
                  matchesPlan
                )
              })
              .map((member) => (

                <tr key={member.id}>

                  <td>

                    <div className="member-name-cell">

                      <div className="member-avatar">
                        {member.name
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <strong>
                        {member.name}
                      </strong>

                    </div>

                  </td>

                  <td>{member.email}</td>

                  <td>{member.phone}</td>

                  <td>

                    <span className="member-plan-badge">
                      {member.plan}
                    </span>

                  </td>

                  <td>

                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteMember(member.id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

          </tbody>

        </table>

        {members.filter((member) => {

          const searchText =
            memberSearch.toLowerCase()

          const matchesSearch =
            member.name
              .toLowerCase()
              .includes(searchText) ||
            member.email
              .toLowerCase()
              .includes(searchText)

          const matchesPlan =
            memberPlanFilter === 'All' ||
            member.plan === memberPlanFilter

          return (
            matchesSearch &&
            matchesPlan
          )

        }).length === 0 && (

          <div className="no-members">

            <span>👥</span>

            <h3>No members found</h3>

            <p>
              Try changing your search or membership filter.
            </p>

          </div>

        )}

      </div>

    </div>
  )

  // ================= TRAINERS PAGE =================

  const trainersPage = (
    <div>

      <div className="page-header">

        <div>
          <h1>Trainers</h1>
          <p>Manage gym trainers</p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            setShowTrainerForm(!showTrainerForm)
          }
        >
          + Add Trainer
        </button>

      </div>

      {showTrainerForm && (

        <div className="form-card">

          <h2>Add New Trainer</h2>

          <input
            type="text"
            placeholder="Trainer Name"
            value={newTrainer.name}
            onChange={(e) =>
              setNewTrainer({
                ...newTrainer,
                name: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Specialty"
            value={newTrainer.specialty}
            onChange={(e) =>
              setNewTrainer({
                ...newTrainer,
                specialty: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={newTrainer.phone}
            onChange={(e) =>
              setNewTrainer({
                ...newTrainer,
                phone: e.target.value
              })
            }
          />

          <button
            className="primary-button"
            onClick={addTrainer}
          >
            Save Trainer
          </button>

        </div>

      )}

      <div className="table-card">

        <table>

          <thead>

            <tr>
              <th>Name</th>
              <th>Specialty</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {trainers.map((trainer) => (

              <tr key={trainer.id}>

                <td>{trainer.name}</td>
                <td>{trainer.specialty}</td>
                <td>{trainer.phone}</td>

                <td>

                  <button
                    className="delete-button"
                    onClick={() =>
                      deleteTrainer(trainer.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )

  // ================= PLANS PAGE =================

  const plansPage = (
    <div>

      <div className="page-header">

        <div>
          <h1>Membership Plans</h1>
          <p>Manage gym membership plans</p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            setShowPlanForm(!showPlanForm)
          }
        >
          + Add Plan
        </button>

      </div>

      {showPlanForm && (

        <div className="form-card">

          <h2>Add New Plan</h2>

          <input
            type="text"
            placeholder="Plan Name"
            value={newPlan.name}
            onChange={(e) =>
              setNewPlan({
                ...newPlan,
                name: e.target.value
              })
            }
          />

          <input
            type="number"
            placeholder="Price"
            value={newPlan.price}
            onChange={(e) =>
              setNewPlan({
                ...newPlan,
                price: e.target.value
              })
            }
          />

          <select
            value={newPlan.duration}
            onChange={(e) =>
              setNewPlan({
                ...newPlan,
                duration: e.target.value
              })
            }
          >

            <option>1 Month</option>
            <option>3 Months</option>
            <option>6 Months</option>
            <option>12 Months</option>

          </select>

          <button
            className="primary-button"
            onClick={addPlan}
          >
            Save Plan
          </button>

        </div>

      )}

      <div className="plans-grid">

        {plans.map((plan) => (

          <div
            className="plan-card"
            key={plan.id}
          >

            <div className="plan-top">

              <span className="plan-icon">
                {plan.icon}
              </span>

            </div>

            <h3>{plan.name}</h3>

            <div className="plan-price">
              ₹{plan.price}
            </div>

            <div className="plan-info">
              Duration: {plan.duration}
            </div>

            <button
              className="delete-button"
              onClick={() =>
                deletePlan(plan.id)
              }
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  )

  // ================= ATTENDANCE PAGE =================

  const attendancePage = (
    <div>

      <div className="page-header">

        <div>
          <h1>Attendance</h1>
          <p>Track member attendance</p>
        </div>

      </div>

      <div className="form-card">

        <h2>Mark Attendance</h2>

        <select
          value={newAttendance.member}
          onChange={(e) =>
            setNewAttendance({
              ...newAttendance,
              member: e.target.value
            })
          }
        >

          <option value="">
            Select Member
          </option>

          {members.map((member) => (

            <option
              key={member.id}
              value={member.name}
            >
              {member.name}
            </option>

          ))}

        </select>

        <input
          type="date"
          value={newAttendance.date}
          onChange={(e) =>
            setNewAttendance({
              ...newAttendance,
              date: e.target.value
            })
          }
        />

        <select
          value={newAttendance.status}
          onChange={(e) =>
            setNewAttendance({
              ...newAttendance,
              status: e.target.value
            })
          }
        >

          <option>Present</option>
          <option>Absent</option>

        </select>

        <button
          className="primary-button"
          onClick={addAttendance}
        >
          Mark Attendance
        </button>

      </div>

      <div className="table-card">

        <table>

          <thead>

            <tr>
              <th>Member</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {attendance.map((record) => (

              <tr key={record.id}>

                <td>{record.member}</td>
                <td>{record.date}</td>
                <td>{record.status}</td>

                <td>

                  <button
                    className="delete-button"
                    onClick={() =>
                      deleteAttendance(record.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )

  // ================= WORKOUT PAGE =================

  const workoutPage = (
    <div>

      <div className="page-header">

        <div>
          <h1>Workout & Diet Plans</h1>
          <p>
            Create personalized plans for members
          </p>
        </div>

      </div>

      <div className="form-card">

        <h2>Add Workout & Diet Plan</h2>

        <select
          value={newWorkoutPlan.member}
          onChange={(e) =>
            setNewWorkoutPlan({
              ...newWorkoutPlan,
              member: e.target.value
            })
          }
        >

          <option value="">
            Select Member
          </option>

          {members.map((member) => (

            <option
              key={member.id}
              value={member.name}
            >
              {member.name}
            </option>

          ))}

        </select>

        <input
          type="text"
          placeholder="Workout Plan"
          value={newWorkoutPlan.workout}
          onChange={(e) =>
            setNewWorkoutPlan({
              ...newWorkoutPlan,
              workout: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Diet Plan"
          value={newWorkoutPlan.diet}
          onChange={(e) =>
            setNewWorkoutPlan({
              ...newWorkoutPlan,
              diet: e.target.value
            })
          }
        />

        <select
          value={newWorkoutPlan.duration}
          onChange={(e) =>
            setNewWorkoutPlan({
              ...newWorkoutPlan,
              duration: e.target.value
            })
          }
        >

          <option>4 Weeks</option>
          <option>8 Weeks</option>
          <option>12 Weeks</option>

        </select>

        <button
          className="primary-button"
          onClick={addWorkoutPlan}
        >
          Save Plan
        </button>

      </div>

      <div className="workout-grid">

        {workoutPlans.map((plan) => (

          <div
            className="workout-card"
            key={plan.id}
          >

            <div className="workout-card-header">

              <h3>{plan.member}</h3>

              <button
                className="delete-button"
                onClick={() =>
                  deleteWorkoutPlan(plan.id)
                }
              >
                Delete
              </button>

            </div>

            <div className="workout-section">

              <h4>🏋️ Workout</h4>

              <p>{plan.workout}</p>

            </div>

            <div className="workout-section">

              <h4>🥗 Diet</h4>

              <p>{plan.diet}</p>

            </div>

            <div className="workout-duration">
              Duration: {plan.duration}
            </div>

          </div>

        ))}

      </div>

    </div>
  )

  // ================= PAYMENTS PAGE =================

  const paymentsPage = (
    <div>

      <div className="page-header">

        <div>
          <h1>Payments</h1>
          <p>
            Manage gym membership payments
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            setShowPaymentForm(!showPaymentForm)
          }
        >
          + Add Payment
        </button>

      </div>

      {showPaymentForm && (

        <div className="form-card">

          <h2>Add Payment</h2>

          <select
            value={newPayment.member}
            onChange={(e) =>
              setNewPayment({
                ...newPayment,
                member: e.target.value
              })
            }
          >

            <option value="">
              Select Member
            </option>

            {members.map((member) => (

              <option
                key={member.id}
                value={member.name}
              >
                {member.name}
              </option>

            ))}

          </select>

          <input
            type="number"
            placeholder="Amount"
            value={newPayment.amount}
            onChange={(e) =>
              setNewPayment({
                ...newPayment,
                amount: e.target.value
              })
            }
          />

          <input
            type="date"
            value={newPayment.date}
            onChange={(e) =>
              setNewPayment({
                ...newPayment,
                date: e.target.value
              })
            }
          />

          <select
            value={newPayment.method}
            onChange={(e) =>
              setNewPayment({
                ...newPayment,
                method: e.target.value
              })
            }
          >

            <option>UPI</option>
            <option>Cash</option>
            <option>Card</option>

          </select>

          <select
            value={newPayment.status}
            onChange={(e) =>
              setNewPayment({
                ...newPayment,
                status: e.target.value
              })
            }
          >

            <option>Paid</option>
            <option>Pending</option>

          </select>

          <button
            className="primary-button"
            onClick={addPayment}
          >
            Save Payment
          </button>

        </div>

      )}

      <div className="payment-summary">

        <div className="payment-summary-card">

          <span>💰</span>

          <div>

            <h3>
              ₹
              {payments.reduce(
                (total, payment) =>
                  total + Number(payment.amount),
                0
              )}
            </h3>

            <p>Total Amount</p>

          </div>

        </div>

        <div className="payment-summary-card">

          <span>✅</span>

          <div>

            <h3>
              {
                payments.filter(
                  (payment) =>
                    payment.status === 'Paid'
                ).length
              }
            </h3>

            <p>Paid Payments</p>

          </div>

        </div>

        <div className="payment-summary-card">

          <span>⏳</span>

          <div>

            <h3>
              {
                payments.filter(
                  (payment) =>
                    payment.status === 'Pending'
                ).length
              }
            </h3>

            <p>Pending Payments</p>

          </div>

        </div>

      </div>

      <div className="table-card">

        <table>

          <thead>

            <tr>
              <th>Member</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Method</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {payments.map((payment) => (

              <tr key={payment.id}>

                <td>{payment.member}</td>
                <td>₹{payment.amount}</td>
                <td>{payment.date}</td>
                <td>{payment.method}</td>

                <td>

                  <span
                    className={
                      payment.status === 'Paid'
                        ? 'status-paid'
                        : 'status-pending'
                    }
                  >
                    {payment.status}
                  </span>

                </td>

                <td>

                  <button
                    className="delete-button"
                    onClick={() =>
                      deletePayment(payment.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )

  // ================= SETTINGS PAGE =================

  const settingsPage = (
    <div>

      <div className="page-header">

        <div>
          <h1>Profile & Settings</h1>
          <p>
            Manage administrator profile and account settings
          </p>
        </div>

      </div>

      <div className="settings-grid">

        <div className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon">
              👤
            </div>

            <div>
              <h2>Admin Profile</h2>
              <p>
                Update your personal information
              </p>
            </div>

          </div>

          <label>Admin Name</label>

          <input
            type="text"
            value={profile.name}
            onChange={(e) =>
              setProfile({
                ...profile,
                name: e.target.value
              })
            }
          />

          <label>Email Address</label>

          <input
            type="email"
            value={profile.email}
            onChange={(e) =>
              setProfile({
                ...profile,
                email: e.target.value
              })
            }
          />

          <label>Phone Number</label>

          <input
            type="text"
            value={profile.phone}
            onChange={(e) =>
              setProfile({
                ...profile,
                phone: e.target.value
              })
            }
          />

          <label>Gym Name</label>

          <input
            type="text"
            value={profile.gymName}
            onChange={(e) =>
              setProfile({
                ...profile,
                gymName: e.target.value
              })
            }
          />

          <button
            className="primary-button"
            onClick={saveProfile}
          >
            💾 Save Profile
          </button>

        </div>

        <div className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon">
              🔐
            </div>

            <div>
              <h2>Change Password</h2>
              <p>
                Update your account password
              </p>
            </div>

          </div>

          <label>Current Password</label>

          <input
            type="password"
            placeholder="Enter current password"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                current: e.target.value
              })
            }
          />

          <label>New Password</label>

          <input
            type="password"
            placeholder="Enter new password"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                newPassword: e.target.value
              })
            }
          />

          <label>Confirm New Password</label>

          <input
            type="password"
            placeholder="Confirm new password"
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                confirm: e.target.value
              })
            }
          />

          <button
            className="primary-button"
            onClick={changePassword}
          >
            🔒 Change Password
          </button>

        </div>

      </div>

      <div className="settings-info-card">

        <h2>⚙️ Gym System Information</h2>

        <div className="info-row">
          <span>System Name</span>
          <strong>
            FitZone Gym Management System
          </strong>
        </div>

        <div className="info-row">
          <span>Administrator</span>
          <strong>{profile.name}</strong>
        </div>

        <div className="info-row">
          <span>Registered Members</span>
          <strong>{members.length}</strong>
        </div>

        <div className="info-row">
          <span>Available Trainers</span>
          <strong>{trainers.length}</strong>
        </div>

        <div className="info-row">
          <span>Membership Plans</span>
          <strong>{plans.length}</strong>
        </div>

      </div>

    </div>
  )

  // ================= MAIN RETURN =================

  return (
    <div className="app-container">

      <aside className="sidebar">

        <div className="sidebar-logo">
          <span>🏋️</span>
          <h2>FitZone</h2>
        </div>

        <nav>

          {menuItems.map((item) => (

            <button
              key={item.value}
              className={
                page === item.value
                  ? 'menu-item active'
                  : 'menu-item'
              }
              onClick={() =>
                setPage(item.value)
              }
            >

              <span>{item.icon}</span>

              {item.name}

            </button>

          ))}

        </nav>

        <button
          className="logout-button"
          onClick={() =>
            alert(
              'Logout functionality will be added later.'
            )
          }
        >
          🚪 Logout
        </button>

      </aside>

      <main className="main-content">

        <div className="topbar">

          <h2>{getPageTitle()}</h2>

          <div className="admin-profile">

            <span>👩‍💻</span>

            <div>
              <strong>{profile.name}</strong>
              <small>Gym Administrator</small>
            </div>

          </div>

        </div>

        <div className="content-area">

          {page === 'dashboard' && dashboard}

          {page === 'members' && membersPage}

          {page === 'trainers' && trainersPage}

          {page === 'plans' && plansPage}

          {page === 'attendance' && attendancePage}

          {page === 'workout' && workoutPage}

          {page === 'payments' && paymentsPage}

          {page === 'settings' && settingsPage}

        </div>

      </main>

    </div>
  )
}

export default App
