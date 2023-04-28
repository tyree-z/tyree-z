<template>
  <div class="table-responsive">
    <table class="table table-vcenter card-table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Start</th>
          <th>End</th>
          <th>Position</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, index) in employees" :key="index">
          <td>{{ employee.name }}</td>
          <td>{{ employee.start }}</td>
          <td>{{ employee.end }}</td>
          <td>{{ employee.position }}</td>
          <td>{{ employee.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'EmployeeTable',
  props: {
    employees: {
      type: Array,
      required: true
    }
  }
}
</script>
