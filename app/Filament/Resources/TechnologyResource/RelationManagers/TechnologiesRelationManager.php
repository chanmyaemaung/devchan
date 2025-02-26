<?php

namespace App\Filament\Resources\TechnologyResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TechnologiesRelationManager extends RelationManager
{
    protected static string $relationship = 'technologies';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Programming Language Details')
                    ->description('Enter the details of the programming language.')
                    ->collapsible()
                    ->schema([
                        Group::make([
                            Select::make('tech_stack_id')
                                ->relationship('techStack', 'name')
                                ->label(__('Tech Stack')),
                            TextInput::make('name')
                                ->label(__('Name'))
                                ->unique(
                                    table: 'technologies',
                                    column: 'name',
                                    ignorable: fn ($record) => $record,
                                    modifyRuleUsing: fn ($rule) => $rule->where('tech_stack_id', $this->ownerRecord->id)
                                )
                                ->required()
                                ->placeholder(__('Enter technology name')),
                            TextInput::make('url')
                                ->label(__('URL'))
                                ->placeholder('https://example.com'),
                        ])->columns(3),

                        FileUpload::make('icon')
                            ->disk('public')
                            ->directory('technologies')
                            ->label(__('Icon Image'))
                            ->placeholder('Upload icon image')
                            ->columnSpanFull()
                            ->acceptedFileTypes(['image/*'])
                            ->columnSpanFull(),
                    ])
                    ->columns(1),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('name')
            ->columns([
                TextColumn::make('techStack.name')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('name')
                    ->searchable(),
                ImageColumn::make('icon')
                    ->disk('public')
                    ->size(40),
                TextColumn::make('url')
                    ->searchable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
