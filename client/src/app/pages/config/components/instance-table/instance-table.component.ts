import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InstanceService } from 'src/app/services/instance.service';
import { Instance, InstanceType, IdentifierMode } from 'src/app/models/Instance';

@Component({
  selector: 'app-instance-table',
  templateUrl: './instance-table.component.html',
  styleUrls: ['./instance-table.component.css']
})
export class InstanceTableComponent implements OnInit {

  instanceTypes = Object.keys(InstanceType).filter(k => isNaN(Number(k)));
  identifierModes = Object.keys(IdentifierMode).filter(k => isNaN(Number(k)));

  instanceForm = {
    id: 0,
    name: '',
    description: '',
    type: '',
    identifierMode: '',
    save: ''
  }
  instances: Array<Instance>;
  editMode = false;

  displayedInstanceColumns = ['id', 'name', 'type', 'identifierMode', 'save', 'createdAt', 'actions']

  constructor(private _instanceService: InstanceService) { }

  ngOnInit(): void {
    this.clearForm();
    this.getInstances();
  }

  getInstances() {
    this._instanceService.getAll().then(res => this.instances = res);
  }

  getInstanceType(instanceType) {
    return InstanceType[instanceType];
  }

  getIdentifierMode(identifierMode) {
    return IdentifierMode[identifierMode];
  }

  cancel() {
    this.editMode = false;
    this.clearForm();
  }

  createInstance(instance) {
    this._instanceService.create(instance)
      .then(res => {
        this.getInstances();
        this.clearForm();
      })
      .catch(e => console.error(e))
  }

  editInstance(instance) {
    this.editMode = true;
    this.instanceForm = { ...instance };
  }

  updateInstance(instance) {
    this._instanceService.update(instance)
      .then(res => {
        this.getInstances();
        this.editMode = false;
      })
      .catch(e => console.error(e))
  }

  deleteInstance(instance) {
    const confirm = window.confirm('Deseja excluir este dispositivo?');
    if (!confirm)
      return;

    this._instanceService.delete(instance.id)
      .then(res => {
        this.getInstances();
      })
      .catch(e => console.error(e))
  }

  clearForm() {

    this.instanceForm = {
      id: 0,
      name: '',
      description: '',
      type: '',
      identifierMode: '',
      save: ''
    }

  }


}
